import React from 'react';
import { NavLink } from 'react-router';

const BattleHeader = ({ localBattle, opponentConnected, timeLeft, battleStatus, formatTime }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm p-6 mb-6 border-l-4 border-amber-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-amber-300 mb-2">
            {localBattle?.title || '1vs1 Coding Battle'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${opponentConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
              <span className="text-gray-400">
                {opponentConnected ? 'Opponent connected' : 'Opponent disconnected'}
              </span>
            </div>
            <div className="text-lg font-semibold text-amber-400">
              Time Left: <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-gray-400">
              Status: <span className="font-medium capitalize text-amber-300">{battleStatus}</span>
            </div>
          </div>
        </div>
        <NavLink 
          to="/onevsone" 
          className="px-4 py-2 bg-gray-800 text-gray-100 rounded-lg hover:bg-gray-700 transition border border-gray-700"
        >
          Leave Battle
        </NavLink>
      </div>
    </div>
  );
};

export default BattleHeader;