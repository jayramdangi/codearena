import ContestCard from './ContestCard';

const ContestSection = ({ contests }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          Contests Attended
        </h2>
        <span className="text-sm text-gray-400">
          {contests?.length || 0} contests
        </span>
      </div>

      {contests?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contests.map((contest, index) => (
            <ContestCard
              key={index}
              title={contest.title}
              startTime={contest.startTime}
              duration={contest.duration}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="text-gray-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-400">
            No contests attended yet. Join a contest to appear here!
          </p>
        </div>
      )}
    </div>
  );
};

export default ContestSection;