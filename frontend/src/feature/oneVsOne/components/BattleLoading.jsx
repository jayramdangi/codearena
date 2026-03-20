import React from 'react';

const BattleLoading = ({ battleStatus = 'loading' }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading battle room...</p>
        <p className="text-sm text-gray-500 mt-2">Status: {battleStatus}</p>
      </div>
    </div>
  );
};

export default BattleLoading;