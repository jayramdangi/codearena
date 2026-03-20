import RadialProgress from './RadialProgress';

const OverallProgressCard = ({ stats }) => {
  return (
    <div className="lg:col-span-2 bg-gray-900 rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">
          Solved Problems
        </h2>
        <span className="text-lg font-bold text-amber-300">
          {stats.totalSolved} / {stats.totalProblems}
        </span>
      </div>
      <div className="mb-6">
        <div className="w-full bg-gray-800 rounded-full h-4">
          <div
            className="bg-amber-500 h-4 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${stats.solvedPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>0%</span>
          <span>{stats.solvedPercentage}%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="mt-8">
        <RadialProgress
          easy={stats.easy.solved}
          medium={stats.medium.solved}
          hard={stats.hard.solved}
          total={stats.totalSolved}
        />

        <div className="flex justify-center mt-6 space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-100">
              Easy: {stats.easy.solved}/{stats.easy.total}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-100">
              Medium: {stats.medium.solved}/{stats.medium.total}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-100">
              Hard: {stats.hard.solved}/{stats.hard.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallProgressCard;