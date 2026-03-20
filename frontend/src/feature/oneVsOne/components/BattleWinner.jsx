import React, { useEffect, useState } from 'react';

const BattleWinner = ({ winner, user, localBattle, currentPlayerSolved, opponentSolved, problemsCount, navigate }) => {
  const [redirectTimer, setRedirectTimer] = useState(5);
  const isTie = winner === 'tie';
  const isUserWinner = winner === user._id;
  const winnerPlayer = isTie ? null : (winner === localBattle.player1._id ? localBattle.player1 : localBattle.player2);
  const winnerName = winnerPlayer ? `${winnerPlayer.firstName || ''} ${winnerPlayer.lastName || ''}`.trim() : '';

  useEffect(() => {
    const timer = setInterval(() => {
      setRedirectTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/onevsone', {
            state: {
              notification: {
                type: isUserWinner ? 'success' : 'info',
                message: isTie ? "It's a tie! Great battle!" :
                  isUserWinner ? '🎉 You won! Congratulations!' : 'Game over! Better luck next time!'
              }
            }
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isUserWinner, isTie]);

  const handleImmediateNavigation = () => {
    navigate('/onevsone');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center text-gray-100 p-8">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute text-6xl animate-bounce" style={{ top: '10%', left: '10%' }}>🎉</div>
        <div className="absolute text-5xl animate-pulse" style={{ top: '15%', right: '15%' }}>🏆</div>
        <div className="absolute text-4xl animate-bounce delay-1000" style={{ bottom: '20%', left: '15%' }}>⭐</div>
        <div className="absolute text-5xl animate-pulse delay-500" style={{ bottom: '25%', right: '10%' }}>🎯</div>
        <div className="absolute text-3xl animate-bounce delay-1500" style={{ top: '40%', left: '20%' }}>✨</div>
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="mb-8">
          <div className="text-8xl mb-4">{isTie ? '🤝' : isUserWinner ? '👑' : '🎖️'}</div>
          <h1 className="text-5xl font-bold mb-4 text-amber-300 drop-shadow-lg">
            {isTie ? "It's a Tie!" : isUserWinner ? 'Victory!' : 'Game Over'}
          </h1>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-amber-500">
          <h2 className="text-3xl font-bold mb-4">{isTie ? 'Equal Skills!' : `${winnerName} Wins!`}</h2>
          <p className="text-xl mb-4 text-gray-300">
            {isTie ? 'Both players showed exceptional skills!' : 
             isUserWinner ? 'Congratulations on your outstanding victory!' : 
             'Better luck next time! Keep practicing!'}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
              <h3 className="font-semibold text-lg mb-2 text-gray-100">You</h3>
              <p className="text-2xl font-bold text-amber-300">{currentPlayerSolved.length}/{problemsCount}</p>
              <p className="text-sm text-gray-400">Problems Solved</p>
            </div>
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
              <h3 className="font-semibold text-lg mb-2 text-gray-100">Opponent</h3>
              <p className="text-2xl font-bold text-amber-300">{opponentSolved.length}/{problemsCount}</p>
              <p className="text-sm text-gray-400">Problems Solved</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleImmediateNavigation}
            className="px-8 py-4 bg-amber-500 text-gray-900 rounded-xl hover:bg-amber-400 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🏠 Back to Battles
          </button>
          <div className="text-sm text-gray-400 mt-4">
            Auto-redirecting in {redirectTimer} seconds...
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleWinner;