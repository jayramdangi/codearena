import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../../context/SocketContext';
import { setNotification, setBattleCancelled, setWinner } from '../../../store/onevsoneSlice';
import { useProblemSolving } from '../../../shared/hooks/useProblemSolving';
import { useCodeExecution } from '../../../shared/hooks/useCodeExecution';
import ResizablePanels from '../../../shared/components/problem-solving/ResizablePanels';
import ProblemTabs from '../../../shared/components/problem-solving/ProblemTabs';
import ProblemDescription from '../../../shared/components/problem-solving/ProblemDescription';
import CodeEditor from '../../../shared/components/problem-solving/CodeEditor';
import EditorToolbar from '../../../shared/components/problem-solving/EditorToolbar';
import TestResults from '../../../shared/components/problem-solving/TestResults';
import SubmissionResults from '../../../shared/components/problem-solving/SubmissionResults';

const SolveOneVsOneProblemPage = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [roomId, setRoomId] = useState(null);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(null);
  const [isBattle, setIsBattle] = useState(false);
  
  const battleCompletedRef = useRef(false);
  const socket = useSocket();

  const {
    problem,
    loading,
    error,
    selectedLanguage,
    code,
    editorValue,
    getDifficultyInfo,
    setSelectedLanguage,
    setCode: setCodeInternal,
    setEditorValue
  } = useProblemSolving(problemId);

  const {
    runResult,
    submitResult,
    isExecuting,
    handleRun,
    handleSubmit,
    clearResults
  } = useCodeExecution(problemId, 'onevsone');

  // Battle socket handlers
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.includes('onevsone') && pathParts.includes('battle')) {
      setIsBattle(true);
      const rid = pathParts[3];
      setRoomId(rid);

      if (socket) {
        const handleBattleCanceled = (data) => {
          if (data.roomId && data.roomId !== rid) return;
          battleCompletedRef.current = true;
          dispatch(setBattleCancelled(true));
          dispatch(setNotification({
            type: 'info',
            message: data?.message || 'Battle was cancelled'
          }));
          navigate(`/onevsone/battle/${rid}`);
        };

        const handleBattleCompleted = (data) => {
          battleCompletedRef.current = true;
          dispatch(setWinner(data.winner));
          dispatch(setNotification({
            type: 'info',
            message: 'Battle completed!'
          }));
          navigate(`/onevsone/battle/${rid}`);
        };

        socket.on('onevsone:battleCanceled', handleBattleCanceled);
        socket.on('battle:completed', handleBattleCompleted);

        // Join battle room
        socket.emit('battle:join', { roomId: rid });

        // Fetch battle details
        const fetchBattleData = async () => {
          try {
            const axiosClient = require('../../../../utils/axiosClient').default;
            const response = await axiosClient.get(`/onevsone/battle/${rid}`);
            const battle = response.data;
            const index = (battle.problems || []).findIndex(p => p._id === problemId);
            if (index !== -1) setCurrentProblemIndex(index);
          } catch (error) {
            console.error('Error fetching battle data:', error);
          }
        };
        fetchBattleData();

        return () => {
          socket.off('onevsone:battleCanceled');
          socket.off('battle:completed');
          socket.emit('battle:leave', { roomId: rid });
        };
      }
    }
  }, [socket, problemId, navigate, dispatch]);

  const handleEditorChange = (value) => {
    if (battleCompletedRef.current) return;
    setEditorValue(value);
    setCodeInternal(value);
  };

  const handleRunClick = async () => {
    if (battleCompletedRef.current) {
      dispatch(setNotification({
        type: 'error',
        message: 'Battle has ended. Cannot run code.'
      }));
      return;
    }
    
    const result = await handleRun(code, selectedLanguage);
    if (result.success) {
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitClick = async () => {
    if (battleCompletedRef.current) {
      dispatch(setNotification({
        type: 'error',
        message: 'Battle has ended. Cannot submit code.'
      }));
      return;
    }
    
    const result = await handleSubmit(code, selectedLanguage, null, roomId);
    if (result.success) {
      setActiveRightTab('result');
      
      // Update battle progress if accepted
      if (result.data.accepted && socket && roomId && currentProblemIndex !== null && user) {
        try {
          socket.emit('battle:progress', {
            roomId,
            playerId: user._id,
            problemIndex: currentProblemIndex,
          });
        } catch (e) {
          console.warn('emit battle:progress failed', e);
        }
      }
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-400">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const leftPanel = (
    <div className="flex-1 flex flex-col bg-gray-900 rounded-2xl border-2 border-amber-500/30 shadow-lg shadow-amber-500/20 overflow-hidden h-full">
      <ProblemTabs
        activeTab={activeLeftTab}
        onTabChange={setActiveLeftTab}
        type="left"
        availableTabs={['description']}
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        {activeLeftTab === 'description' && (
          <ProblemDescription problem={problem} getDifficultyInfo={getDifficultyInfo} />
        )}
      </div>
    </div>
  );

  const rightPanel = (
    <div className="flex-1 flex flex-col bg-gray-900 rounded-2xl border-2 border-amber-500/30 shadow-lg shadow-amber-500/20 overflow-hidden h-full">
      <ProblemTabs
        activeTab={activeRightTab}
        onTabChange={setActiveRightTab}
        type="right"
        availableTabs={['code', 'testcase', 'result']}
      />
      
      <EditorToolbar
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onRun={handleRunClick}
        onSubmit={handleSubmitClick}
        isExecuting={isExecuting}
        runLabel="Run"
        submitLabel="Submit to Battle"
      />
      
      <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
        {activeRightTab === 'code' && (
          <div className="flex-1 flex flex-col p-2 h-full">
            <CodeEditor
              language={selectedLanguage}
              value={editorValue}
              onChange={handleEditorChange}
              height="100%"
            />
          </div>
        )}
        
        {activeRightTab === 'testcase' && (
          <div className="flex-1 p-3 overflow-y-auto">
            <h3 className="font-semibold text-amber-400 mb-3 text-sm">Test Results</h3>
            <TestResults runResult={runResult} />
          </div>
        )}
        
        {activeRightTab === 'result' && (
          <div className="flex-1 p-3 overflow-y-auto">
            <h3 className="font-semibold text-amber-400 mb-3 text-sm">Submission Result</h3>
            <SubmissionResults submitResult={submitResult} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <ResizablePanels
        leftPanel={leftPanel}
        rightPanel={rightPanel}
        initialLeftWidth={48}
      />
    </div>
  );
};

export default SolveOneVsOneProblemPage;