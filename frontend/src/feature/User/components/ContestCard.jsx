const ContestCard = ({ title, startTime, duration }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
  };

  const getContestStatus = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);

    if (now < start) {
      return 'Upcoming';
    } else if (now > start) {
      return 'Completed';
    }
    return 'Live';
  };

  const status = getContestStatus(startTime);

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm p-5 transition-all hover:shadow-md border-l-4 border-amber-500">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-100 truncate max-w-[70%]">
          {title}
        </h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            status === 'Completed'
              ? 'bg-green-800 text-green-200'
              : status === 'Live'
              ? 'bg-yellow-800 text-yellow-200'
              : 'bg-amber-800 text-amber-100'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <div className="text-xs text-gray-400">Start Time</div>
          <div className="text-sm font-medium text-gray-100">
            {formatDate(startTime)}
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-400">Duration</div>
          <div className="text-sm font-medium text-gray-100">
            {formatDuration(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;