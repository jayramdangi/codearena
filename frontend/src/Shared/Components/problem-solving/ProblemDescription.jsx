import { DIFFICULTY_COLORS } from '../../utils/constants';

const ProblemDescription = ({ problem, getDifficultyInfo }) => {
  if (!problem) return null;

  const difficultyInfo = getDifficultyInfo(problem.difficulty);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-amber-300">{problem.title}</h1>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyInfo.bgColor}`}>
          {difficultyInfo.displayName}
        </div>
        <div className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
          {problem.tags}
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
          {problem.description}
        </div>
      </div>

      {problem.visibleTestCases && problem.visibleTestCases.length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-amber-300 mb-3">Examples:</h3>
          <div className="space-y-3">
            {problem.visibleTestCases.map((example, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-700 border-l-4 border-amber-500">
                <h4 className="font-semibold text-gray-100 mb-1 text-sm">Example {index + 1}:</h4>
                <div className="space-y-1 font-mono text-xs">
                  <div><strong className="text-gray-400">Input:</strong> <span className="text-gray-300">{example.input}</span></div>
                  <div><strong className="text-gray-400">Output:</strong> <span className="text-gray-300">{example.output}</span></div>
                  {example.explanation && (
                    <div><strong className="text-gray-400">Explanation:</strong> <span className="text-gray-300">{example.explanation}</span></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {problem.constraints && (
        <div>
          <h3 className="text-md font-semibold text-amber-300 mb-3">Constraints:</h3>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">{problem.constraints}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;