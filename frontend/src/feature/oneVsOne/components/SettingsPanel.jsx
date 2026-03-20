import React from 'react';

const SettingsPanel = ({
  selectedTime,
  onSelectTime,
  activeBattle,
  winner,
  connectionStatus,
  socket,
  opponentName,
  onJoinBattle,
  onCancelBattle
}) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-gray-900 rounded-xl shadow-lg p-4 border-2 border-amber-500/50 shadow-amber-500/20 h-full">
        <h3 className="text-lg font-bold text-amber-300 mb-3 text-center">Challenge Settings</h3>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-100 mb-2 flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Challenge Duration
          </h4>
          <div className="flex flex-col gap-2">
            {[10, 20, 30].map(time => (
              <button
                key={time}
                onClick={() => onSelectTime(time)}
                className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                  selectedTime === time
                    ? 'bg-amber-500 text-gray-900 shadow-md'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {time} minutes
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-2 text-center">
            Selected: <span className="text-amber-400 font-semibold">{selectedTime}min</span> •
            Problems: <span className="text-amber-400 font-semibold">{selectedTime / 10}</span>
          </p>
        </div>

        {activeBattle && !winner && (
          <ActiveBattleCard
            activeBattle={activeBattle}
            opponentName={opponentName}
            connectionStatus={connectionStatus}
            onJoinBattle={onJoinBattle}
            onCancelBattle={onCancelBattle}
          />
        )}

        {winner && (
          <WinnerCard winner={winner} opponentName={opponentName} />
        )}

        <ConnectionStatus socket={socket} />
      </div>
    </div>
  );
};

const ActiveBattleCard = ({ activeBattle, opponentName, connectionStatus, onJoinBattle, onCancelBattle }) => (
  <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-lg p-3 text-gray-900 border-2 border-amber-400/50 shadow-amber-400/30">
    <div className="flex justify-between items-start mb-2">
      <h2 className="text-md font-bold">Live Battle!</h2>
      <button
        onClick={onCancelBattle}
        className="text-gray-900/80 hover:text-gray-900 text-xs transition-colors"
        title="Cancel Battle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div className="flex items-center mb-2">
      <div className="bg-gray-900/20 rounded-full p-1 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-xs">Battling against</p>
        <p className="font-bold text-sm">{opponentName}</p>
      </div>
    </div>

    {activeBattle.opponent?._id && (
      <div className="flex items-center mb-2">
        <div className={`w-2 h-2 rounded-full mr-1 ${
          connectionStatus[activeBattle.opponent._id]
            ? 'bg-green-400 animate-pulse'
            : 'bg-yellow-400'
        }`}></div>
        <span className="text-xs">
          {connectionStatus[activeBattle.opponent._id]
            ? 'Opponent connected'
            : 'Opponent disconnected'}
        </span>
      </div>
    )}

    <div className="flex justify-between items-center mt-3">
      <div className="flex gap-1">
        <div className="bg-gray-900/20 rounded px-2 py-1 text-xs">
          <span className="font-mono">{activeBattle.duration}min</span>
        </div>
        <div className="bg-gray-900/20 rounded px-2 py-1 text-xs">
          <span>{activeBattle.problemCount || 0} problems</span>
        </div>
      </div>
      <button
        onClick={onJoinBattle}
        className="bg-gray-900 text-amber-400 hover:bg-gray-800 font-bold py-1 px-3 rounded-lg flex items-center transition duration-300 text-xs"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        </svg>
        Join
      </button>
    </div>
  </div>
);

const WinnerCard = ({ winner, opponentName }) => (
  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg p-3 text-white border-2 border-purple-400/50 shadow-purple-400/30 mt-4">
    <div className="text-center">
      <div className="text-2xl mb-2">🏆</div>
      <h2 className="text-md font-bold mb-1">Recent Battle</h2>
      <p className="text-sm font-semibold">
        {winner === 'tie' ? "It was a tie!" :
          winner === user._id ? "You won! 🎉" : `${opponentName} won`}
      </p>
      <p className="text-xs opacity-90 mt-1">Ready for another challenge?</p>
    </div>
  </div>
);

const ConnectionStatus = ({ socket }) => (
  <div className="mt-4 p-2 bg-gray-800 rounded-lg">
    <div className="flex items-center justify-between text-xs">
      <span className="text-gray-400">Connection:</span>
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full mr-1 ${
          socket?.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}></div>
        <span className={socket?.connected ? 'text-green-400' : 'text-red-400'}>
          {socket?.connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  </div>
);

export default SettingsPanel;