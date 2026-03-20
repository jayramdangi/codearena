const StatsSummary = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-800 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-amber-300">
          {stats.totalProblems}
        </div>
        <div className="text-sm text-gray-400">Total Problems</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400">
          {stats.totalSolved}
        </div>
        <div className="text-sm text-gray-400">Solved</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-amber-300">
          {stats.medium.solved}
        </div>
        <div className="text-sm text-gray-400">Medium Solved</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-red-400">
          {stats.hard.solved}
        </div>
        <div className="text-sm text-gray-400">Hard Solved</div>
      </div>
    </div>
  );
};

export default StatsSummary;