const SolvedProblemsTable = ({ solvedProblems }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'font-bold text-sm text-green-500';
      case 'medium':
        return 'font-bold text-sm text-orange-500';
      case 'hard':
        return 'font-bold text-sm text-red-500';
      default:
        return 'font-bold text-sm text-gray-500';
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          Solved Problems
        </h2>
        <span className="text-sm text-gray-400">
          {solvedProblems.length} problems solved
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {solvedProblems.length > 0 ? (
              solvedProblems.map((problem) => (
                <tr key={problem._id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-100">
                      {problem.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {problem.tag && (
                        <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                          {problem.tag}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-gray-400"
                >
                  No problems solved yet. Start your coding journey!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolvedProblemsTable;