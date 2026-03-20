import { useState } from 'react';
import { useParams } from 'react-router';
import { useProblemSolving } from '../../../shared/hooks/useProblemSolving';
import { useCodeExecution } from '../../../shared/hooks/useCodeExecution';
import ResizablePanels from '../../../shared/components/problem-solving/ResizablePanels';
import ProblemTabs from '../../../shared/components/problem-solving/ProblemTabs';
import ProblemDescription from '../../../shared/components/problem-solving/ProblemDescription';
import CodeEditor from '../../../shared/components/problem-solving/CodeEditor';
import EditorToolbar from '../../../shared/components/problem-solving/EditorToolbar';
import TestResults from '../../../shared/components/problem-solving/TestResults';
import SubmissionResults from '../../../shared/components/problem-solving/SubmissionResults';

const SolveContestProblemPage = () => {
  const { problemId, contestId } = useParams();
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  
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
  } = useCodeExecution(problemId, 'contest');

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setCodeInternal(value);
  };

  const handleRunClick = async () => {
    const result = await handleRun(code, selectedLanguage);
    if (result.success) {
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitClick = async () => {
    const result = await handleSubmit(code, selectedLanguage, contestId);
    if (result.success) {
      setActiveRightTab('result');
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
        submitLabel="Submit to Contest"
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

export default SolveContestProblemPage;