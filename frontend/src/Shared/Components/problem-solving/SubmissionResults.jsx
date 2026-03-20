const SubmissionResults = ({ submitResult }) => {
  if (!submitResult) {
    return (
      <div className="text-gray-400 bg-gray-800 rounded-lg p-3 border border-gray-700 border-l-4 border-amber-500 text-sm">
        Click "Submit" to submit your solution for evaluation.
      </div>
    );
  }

  const isAccepted = submitResult.accepted;

  return (
    <div className={`rounded-lg p-3 border-l-4 ${
      isAccepted ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'
    }`}>
      <div>
        {isAccepted ? (
          <div>
            <h4 className="font-bold text-green-400 text-md">🎉 Accepted</h4>
            <div className="mt-3 space-y-1 text-gray-300 text-sm">
              <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
              <p>Runtime: {submitResult.runtime || 0} sec</p>
              <p>Memory: {submitResult.memory || 0} KB</p>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700 border-l-4 border-green-500">
              <h5 className="font-semibold text-green-400 mb-1 text-sm">🎊 Congratulations!</h5>
              <p className="text-gray-300 text-sm">Your solution has been accepted! You've successfully solved this problem.</p>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="font-bold text-red-400 text-md">❌ {submitResult.error || 'Submission Failed'}</h4>
            <div className="mt-3 space-y-1 text-gray-300 text-sm">
              <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700 border-l-4 border-amber-500">
              <h5 className="font-semibold text-amber-400 mb-1 text-sm">💡 Keep Trying!</h5>
              <p className="text-gray-300 text-sm">Review your solution and try again. You can do it!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionResults;