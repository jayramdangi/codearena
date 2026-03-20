const TestResults = ({ runResult }) => {
  if (!runResult) {
    return (
      <div className="text-gray-400 bg-gray-800 rounded-lg p-3 border border-gray-700 border-l-4 border-amber-500 text-sm">
        Click "Run" to test your code with the example test cases.
      </div>
    );
  }

  const isSuccess = runResult.success;
  const testCases = runResult.testCases || [];

  return (
    <div className={`rounded-lg p-3 mb-3 border-l-4 ${
      isSuccess ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'
    }`}>
      <div>
        {isSuccess ? (
          <div>
            <h4 className="font-bold text-green-400 text-md">✅ All test cases passed!</h4>
            <p className="text-gray-300 mt-1 text-sm">Runtime: {runResult.runtime || 0} sec</p>
            <p className="text-gray-300 text-sm">Memory: {runResult.memory || 0} KB</p>
            <div className="mt-3 space-y-2">
              {testCases.map((tc, i) => (
                <div key={i} className="bg-gray-800 p-2 rounded border border-gray-700 border-l-4 border-green-500">
                  <div className="font-mono text-xs">
                    <div><strong className="text-gray-400">Input:</strong> <span className="text-gray-300">{tc.stdin}</span></div>
                    <div><strong className="text-gray-400">Expected:</strong> <span className="text-gray-300">{tc.expected_output}</span></div>
                    <div><strong className="text-gray-400">Output:</strong> <span className="text-gray-300">{tc.stdout}</span></div>
                    <div className={'text-green-400 font-semibold'}>{'✓ Passed'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="font-bold text-red-400 text-md">❌ Error</h4>
            <div className="mt-3 space-y-2">
              {testCases.map((tc, i) => (
                <div key={i} className="bg-gray-800 p-2 rounded border border-gray-700 border-l-4 border-red-500">
                  <div className="font-mono text-xs">
                    <div><strong className="text-gray-400">Input:</strong> <span className="text-gray-300">{tc.stdin}</span></div>
                    <div><strong className="text-gray-400">Expected:</strong> <span className="text-gray-300">{tc.expected_output}</span></div>
                    <div><strong className="text-gray-400">Output:</strong> <span className="text-gray-300">{tc.stdout}</span></div>
                    <div className={tc.status_id === 3 ? 'text-green-400' : 'text-red-400'}>
                      {tc.status_id === 3 ? '✓ Passed' : '✗ Failed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResults;