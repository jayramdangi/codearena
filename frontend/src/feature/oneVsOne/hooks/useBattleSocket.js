import { useEffect, useRef, useState, useCallback } from 'react';

export const useBattleSocket = ({
  socket,
  roomId,
  user,
  localBattle,
  setLocalBattle,
  setBattleStatus,
  dispatch,
  navigate
}) => {
  const [opponentConnected, setOpponentConnected] = useState(true);
  
  const problemsRef = useRef([]);
  const player1SolvedRef = useRef([]);
  const player2SolvedRef = useRef([]);
  const battleCompletedRef = useRef(false);
  const eventsSetupRef = useRef(false);
  const mountedRef = useRef(false);
  const userRef = useRef(user);

  const currentPlayer = localBattle ? 
    (user._id === localBattle.player1._id ? 'player1' : 'player2') : null;
  
  const opponent = localBattle ? 
    (currentPlayer === 'player1' ? localBattle.player2 : localBattle.player1) : null;
  
  const currentPlayerSolved = currentPlayer === 'player1' ? 
    player1SolvedRef.current : player2SolvedRef.current;
  
  const opponentSolved = currentPlayer === 'player1' ? 
    player2SolvedRef.current : player1SolvedRef.current;

  const determineWinnerFromProgress = useCallback(() => {
    if (!localBattle) return 'tie';
    const p1Count = player1SolvedRef.current.length;
    const p2Count = player2SolvedRef.current.length;

    if (p1Count > p2Count) return localBattle.player1._id;
    if (p2Count > p1Count) return localBattle.player2._id;

    if (p1Count === p2Count && p1Count > 0) {
      const p1Times = player1SolvedRef.current.map(s => new Date(s.time).getTime());
      const p2Times = player2SolvedRef.current.map(s => new Date(s.time).getTime());
      const p1Latest = Math.max(...p1Times);
      const p2Latest = Math.max(...p2Times);
      if (p1Latest < p2Latest) return localBattle.player1._id;
      if (p2Latest < p1Latest) return localBattle.player2._id;
    }

    return 'tie';
  }, [localBattle]);

  // 🔥 FIX: Sync refs with localBattle whenever it changes
  useEffect(() => {
    if (localBattle) {
      problemsRef.current = localBattle.problems || [];
      player1SolvedRef.current = localBattle.player1Solved || [];
      player2SolvedRef.current = localBattle.player2Solved || [];
    }
  }, [localBattle]);

  useEffect(() => {
    mountedRef.current = true;
    userRef.current = user;

    return () => {
      mountedRef.current = false;
      eventsSetupRef.current = false;
    };
  }, [user]);

  useEffect(() => {
    if (!socket || !roomId || eventsSetupRef.current) return;

    eventsSetupRef.current = true;

    const handleBattleProgress = (data) => {
      if (!mountedRef.current || battleCompletedRef.current) return;
      
      if (data.player1Solved) player1SolvedRef.current = data.player1Solved;
      if (data.player2Solved) player2SolvedRef.current = data.player2Solved;
      if (data.problems) problemsRef.current = data.problems;

      dispatch(setBattleProgress({
        player1Solved: player1SolvedRef.current,
        player2Solved: player2SolvedRef.current
      }));

      const total = problemsRef.current.length;
      if (total > 0) {
        const p1All = player1SolvedRef.current.length === total;
        const p2All = player2SolvedRef.current.length === total;
        if ((p1All || p2All) && !battleCompletedRef.current) {
          battleCompletedRef.current = true;
          const winner = determineWinnerFromProgress();
          socket.emit('battle:complete', { roomId, winner });
        }
      }
    };

    const handleBattleCompleted = (data) => {
      if (!mountedRef.current || battleCompletedRef.current) return;
      battleCompletedRef.current = true;

      if (localBattle) {
        setLocalBattle(prev => ({ ...prev, winner: data.winner, status: 'completed' }));
      }
      dispatch(setWinner(data.winner));
      dispatch(setActiveBattle(null));
      dispatch(setBattleProgress({ 
        player1Solved: player1SolvedRef.current, 
        player2Solved: player2SolvedRef.current 
      }));
    };

    const handleBattleCanceled = (data) => {
      if (!mountedRef.current) return;
      if (data.roomId && data.roomId !== roomId) return;
      
      battleCompletedRef.current = true;
      setBattleStatus('cancelled');
      dispatch(setBattleCancelled(true));
      dispatch(setActiveBattle(null));
    };

    const handleBattleReconnected = (bdata) => {
      if (!mountedRef.current) return;
      if (bdata) {
        setLocalBattle(bdata);
        dispatch(setActiveBattle(bdata));
        setBattleStatus('active');

        player1SolvedRef.current = bdata.player1Solved || [];
        player2SolvedRef.current = bdata.player2Solved || [];
        problemsRef.current = bdata.problems || [];

        dispatch(setBattleProgress({ 
          player1Solved: player1SolvedRef.current, 
          player2Solved: player2SolvedRef.current 
        }));
      }
    };

    const handleBattleStatus = (data) => {
      if (!mountedRef.current) return;
      
      if (!data.exists) {
        setBattleStatus('not_found');
        return;
      }
      
      if (data.status === 'access_denied') {
        setBattleStatus('access_denied');
        return;
      }

      setOpponentConnected(!!data.opponentConnected);
      setBattleStatus(data.status);

      if (data.player1Solved) player1SolvedRef.current = data.player1Solved;
      if (data.player2Solved) player2SolvedRef.current = data.player2Solved;
      if (data.problems) problemsRef.current = data.problems;

      dispatch(setBattleProgress({ 
        player1Solved: player1SolvedRef.current, 
        player2Solved: player2SolvedRef.current 
      }));
    };

    const handleUserConnectionStatus = ({ userId, connected }) => {
      if (!mountedRef.current) return;
      const currentOpponentId = localBattle ? 
        (userRef.current._id === localBattle.player1._id ? localBattle.player2._id : localBattle.player1._id) : null;
      
      if (currentOpponentId && userId === currentOpponentId) {
        setOpponentConnected(connected);
      }
    };

    socket.on('battle:progress', handleBattleProgress);
    socket.on('battle:completed', handleBattleCompleted);
    socket.on('battle:reconnected', handleBattleReconnected);
    socket.on('onevsone:battleCanceled', handleBattleCanceled);
    socket.on('onevsone:userConnectionStatus', handleUserConnectionStatus);
    socket.on('battle:status', handleBattleStatus);
    socket.on('battle:notFound', () => setBattleStatus('not_found'));

    socket.emit('battle:join', { roomId });
    socket.emit('battle:checkStatus', { roomId });

    return () => {
      socket.off('battle:progress');
      socket.off('battle:completed');
      socket.off('battle:reconnected');
      socket.off('onevsone:battleCanceled');
      socket.off('onevsone:userConnectionStatus');
      socket.off('battle:status');
      socket.off('battle:notFound');
      
      if (socket.connected) {
        socket.emit('battle:leave', { roomId });
      }
    };
  }, [socket, roomId, localBattle, dispatch, navigate, determineWinnerFromProgress]);

  return {
    opponentConnected,
    problemsRef,
    player1SolvedRef,
    player2SolvedRef,
    currentPlayer,
    opponent,
    currentPlayerSolved,
    opponentSolved,
    battleCompletedRef
  };
};