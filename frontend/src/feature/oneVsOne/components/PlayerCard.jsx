import React from 'react';

const PlayerCard = ({ player, isCurrentPlayer, solvedCount, totalProblems }) => {
  if (!player) return null;

  const cardClasses = `bg-gray-900 rounded-2xl shadow-sm p-6 border-l-4 ${
    isCurrentPlayer ? 'border-amber-500' : 'border-blue-500'
  }`;
  
  const badgeClasses = `px-3 py-1 rounded-full text-sm font-medium border ${
    isCurrentPlayer 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }`;
  
  const avatarClasses = `w-12 h-12 rounded-full flex items-center justify-center border ${
    isCurrentPlayer
      ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
      : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
  }`;

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-100">
          {isCurrentPlayer ? 'You' : 'Opponent'}
        </h3>
        <div className={badgeClasses}>
          {solvedCount} / {totalProblems} solved
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className={avatarClasses}>
          <span className="font-bold text-lg">
            {player.firstName?.charAt(0) || (isCurrentPlayer ? 'U' : 'O')}
            {player.lastName?.charAt(0) || ''}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-100">
            {player.firstName || (isCurrentPlayer ? 'User' : 'Opponent')} {player.lastName || ''}
          </p>
          <p className="text-gray-400 text-sm">{player.emailId}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;