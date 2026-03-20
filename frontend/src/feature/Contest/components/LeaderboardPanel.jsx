import React from 'react';
import { NavLink } from 'react-router';

const LeaderboardPanel = ({ id, leaderboard }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm overflow-hidden border-l-4 border-amber-500">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-gray-100">Leaderboard</h2>
        <p className="text-gray-400 text-sm mt-1">
          Top performers in this contest
        </p>
      </div>
      
      <div className="divide-y divide-gray-800">
        {leaderboard.slice(0, 5).map((entry, index) => (
          <div key={entry.userId} className="p-4 hover:bg-gray-800 transition-colors">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 border border-amber-500/30">
                <span className="text-amber-300 font-medium">{index + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-100 truncate">
                  {entry.userId}
                </h3>
                <p className="text-sm text-gray-400">Score: {entry.score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <NavLink
          to={`/contest/leaderboard/${id}`}
          className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-amber-400 py-2 rounded-lg transition-colors font-medium"
        >
          View Full Leaderboard
        </NavLink>
      </div>
    </div>
  );
};

export default LeaderboardPanel;