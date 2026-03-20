const RadialProgress = ({ easy, medium, hard, total }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const totalArc = circumference * 0.75;

  const easyLength = total > 0 ? (easy / total) * totalArc : 0;
  const mediumLength = total > 0 ? (medium / total) * totalArc : 0;
  const hardLength = total > 0 ? (hard / total) * totalArc : 0;

  const easyOffset = 0;
  const mediumOffset = -easyLength;
  const hardOffset = -(easyLength + mediumLength);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full -rotate-202 origin-[50%_50%]"
      >
        {hard > 0 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeDasharray={`${hardLength} ${circumference}`}
            strokeDashoffset={hardOffset + circumference * 0.125}
          />
        )}

        {medium > 0 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeDasharray={`${mediumLength} ${circumference}`}
            strokeDashoffset={mediumOffset + circumference * 0.125}
          />
        )}

        {easy > 0 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeDasharray={`${easyLength} ${circumference}`}
            strokeDashoffset={easyOffset + circumference * 0.125}
          />
        )}
      </svg>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold text-gray-100">{total}</div>
        <div className="text-xs text-gray-400">Solved</div>
      </div>
    </div>
  );
};

export default RadialProgress;