import React from 'react';

const ProblemItem = ({ problem, index, isSolved, opponentSolvedThis, battleStatus, onSolveProblem }) => {
  const handleClick = () => {
    if (battleStatus === 'active') {
      onSolveProblem(problem._id);
    }
  };

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
        isSolved 
          ? 'border-green-500 bg-green-500/10' 
          : 'border-gray-700 hover:border-amber-400'
      } ${battleStatus !== 'active' ? 'opacity-75 cursor-not-allowed' : ''}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            isSolved 
              ? 'bg-green-500 text-gray-900' 
              : 'bg-gray-800 text-gray-400 border border-gray-700'
          }`}>
            {index + 1}
          </div>
          <div>
            <h4 className="font-semibold text-gray-100 text-lg">{problem.title}</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[problem.difficulty] || difficultyColors.medium}`}>
                {problem.difficulty}
              </span>
              {isSolved && (
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-500/30">
                  Solved ✓
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`text-sm ${opponentSolvedThis ? 'text-green-400' : 'text-gray-500'}`}>
            {opponentSolvedThis ? 'Opponent solved' : 'Opponent not solved'}
          </div>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isSolved 
                ? 'bg-green-500 text-gray-900 hover:bg-green-400' 
                : 'bg-amber-500 text-gray-900 hover:bg-amber-400'
            } ${battleStatus !== 'active' ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (battleStatus === 'active') {
                onSolveProblem(problem._id);
              }
            }}
            disabled={battleStatus !== 'active'}
          >
            {isSolved ? 'View Solution' : 'Solve Problem'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemItem;