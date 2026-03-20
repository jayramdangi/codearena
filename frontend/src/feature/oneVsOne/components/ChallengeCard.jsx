import React from 'react';

export default function ChallengeCard({
  challenge,
  type = 'given',
  onAccept,
  onReject,
  onCancel,
  duration = 10,
  connectionStatus = false,
  activeBattle = null
}) {
  const opponent = type === 'given' 
    ? (challenge.challengedUser || {}) 
    : (challenge.challenger || {});
  
  const opponentName = opponent.firstName || opponent.lastName 
    ? `${opponent.firstName || ''} ${opponent.lastName || ''}`.trim()
    : 'Unknown User';
    
  const opponentEmail = opponent.emailId || 'No email available';
  const opponentInitial = opponent.firstName?.charAt(0) || opponent.lastName?.charAt(0) || '?';

  console.log('🎯 ChallengeCard Rendering:', {
    challengeId: challenge._id,
    type,
    opponent,
    opponentName,
    connectionStatus
  });

  return (
    <div className="bg-gray-800 border border-amber-500/30 rounded-xl p-4 flex items-start justify-between hover:border-amber-500/50 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="bg-gray-700 text-amber-300 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg border border-amber-500/30">
          {opponentInitial}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-100">{opponentName}</div>
          <div className="text-sm text-gray-400">{opponentEmail}</div>
          <div className="text-xs text-gray-500 mt-1">
            {challenge.createdAt ? new Date(challenge.createdAt).toLocaleString() : 'Just now'}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
              {duration} min • {Math.floor(duration / 10)} problems
            </span>
            <div 
              className={`w-2 h-2 rounded-full ${connectionStatus ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} 
              title={connectionStatus ? 'User is online' : 'User is offline'} 
            />
            <span className="text-xs text-gray-500">
              {connectionStatus ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        {type === 'given' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
              Sent
            </span>
            <button 
              onClick={() => onCancel && onCancel(challenge._id)} 
              className="text-sm px-3 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
              title="Cancel this challenge"
            >
              Cancel
            </button>
          </div>
        )}

        {type === 'incoming' && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onReject && onReject(challenge._id)} 
              className="text-sm px-3 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
              title="Reject this challenge"
            >
              Reject
            </button>
            <button 
              onClick={() => onAccept && onAccept(challenge)} 
              disabled={!connectionStatus}
              className={`text-sm px-3 py-1 rounded-md font-medium transition-colors border ${
                connectionStatus 
                  ? 'bg-amber-500 text-gray-900 hover:bg-amber-400 border-amber-500' 
                  : 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed'
              }`}
              title={connectionStatus ? "Accept this challenge" : "Challenger is offline"}
            >
              {connectionStatus ? 'Accept' : 'Offline'}
            </button>
          </div>
        )}

        {activeBattle && activeBattle.challengeId === challenge._id && (
          <div className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-md border border-green-500/30">
            Active
          </div>
        )}
      </div>
    </div>
  );
}