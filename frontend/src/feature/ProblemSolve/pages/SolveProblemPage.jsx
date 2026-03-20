import { useState } from 'react';
import { useParams } from 'react-router';
import { useProblemSolving } from '../../../Shared/hooks/useProblemSolving';
import { useCodeExecution } from '../../../shared/hooks/useCodeExecution';
import ResizablePanels from '../../../shared/components/problem-solving/ResizablePanels';
import ProblemTabs from '../../../shared/components/problem-solving/ProblemTabs';
import ProblemDescription from '../../../shared/components/problem-solving/ProblemDescription';
import CodeEditor from '../../../shared/components/problem-solving/CodeEditor';
import EditorToolbar from '../../../shared/components/problem-solving/EditorToolbar';
import TestResults from '../../../shared/components/problem-solving/TestResults';
import SubmissionResults from '../../../shared/components/problem-solving/SubmissionResults';
import ChatAi from '../../../shared/components/ai-help/ChatAi';
import Editorial from '../../../shared/components/ai-help/Editorial';
import SubmissionHistory from '../../../shared/components/ai-help/SubmissionHistory';


const SolveProblemPage = () => {
  const { problemId } = useParams();
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
  } = useCodeExecution(problemId, 'problem');

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
    const result = await handleSubmit(code, selectedLanguage);
    if (result.success) {
      setActiveRightTab('result');
    }
  };

  const renderLeftTabContent = () => {
    if (!problem) return null;

    switch (activeLeftTab) {
      case 'description':
        return <ProblemDescription problem={problem} getDifficultyInfo={getDifficultyInfo} />;
      
      case 'editorial':
        return (
          <div>
            <h2 className="text-lg font-bold text-amber-300 mb-3">Editorial</h2>
            <Editorial 
              secureUrl={problem.secureUrl} 
              thumbnailUrl={problem.thumbnailUrl} 
              duration={problem.duration}
            />
          </div>
        );
      
      case 'solutions':
        return (
          <div>
            <h2 className="text-lg font-bold text-amber-300 mb-3">Solutions</h2>
            <div className="space-y-4">
              {problem.referenceSolution?.map((solution, index) => (
                <div key={index} className="border border-gray-700 rounded-lg bg-gray-800 border-l-4 border-amber-500">
                  <div className="bg-gray-700 px-3 py-2 rounded-t-lg">
                    <h3 className="font-semibold text-gray-100 text-sm">
                      {problem?.title} - {solution?.language}
                    </h3>
                  </div>
                  <div className="p-3">
                    <pre className="bg-gray-900 p-3 rounded text-gray-300 text-xs overflow-x-auto border border-gray-700">
                      <code>{solution?.completeCode}</code>
                    </pre>
                  </div>
                </div>
              )) || <p className="text-gray-400 text-sm">No solutions available yet.</p>}
            </div>
          </div>
        );
      
      case 'submissions':
        return (
          <div>
            <h2 className="text-lg font-bold text-amber-300 mb-3">My Submissions</h2>
            <SubmissionHistory problemId={problemId} />
          </div>
        );
      
      case 'chatAI':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-amber-300 mb-2">AI Assistant</h2>
            <p className="text-sm text-gray-400 mb-4">
              Ask me anything about this problem, coding approach, or debugging help!
            </p>
            <ChatAi problem={problem} codeOfEditor={editorValue} />
          </div>
        );
      
      default:
        return null;
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
        availableTabs={['description', 'editorial', 'solutions', 'submissions', 'chatAI']}
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        {renderLeftTabContent()}
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
        submitLabel="Submit"
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
    <div className="min-h-80vh bg-gray-950">
      <ResizablePanels
        leftPanel={leftPanel}
        rightPanel={rightPanel}
        initialLeftWidth={48}
      />
    </div>
  );
};

export default SolveProblemPage;