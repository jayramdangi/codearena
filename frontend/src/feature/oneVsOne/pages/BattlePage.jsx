import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import BattleHeader from '../components/BattleHeader';
import PlayerCard from '../components/PlayerCard';
import ProblemList from '../components/ProblemList';
import BattleLoading from '../components/BattleLoading';
import BattleError from '../components/BattleError';
import BattleCancelled from '../components/BattleCancelled';
import BattleWinner from '../components/BattleWinner';

import { useSocket } from '../../../context/SocketContext';
import axiosClient from '../../../services/api/axiosClient';
import { setActiveBattle, setBattleProgress, setWinner, setBattleCancelled, setNotification } from '../../../store/onevsoneSlice';

import { useBattleSocket } from '../hooks/useBattleSocket';

const BattlePage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  const { user } = useSelector((state) => state.auth);
  const { activeBattle, battleCancelled, winner: reduxWinner } = useSelector((state) => state.onevsone);

  const [localBattle, setLocalBattle] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [battleStatus, setBattleStatus] = useState('loading');

  const mountedRef = useRef(false);
  const userRef = useRef(user);

  useEffect(() => {
    mountedRef.current = true;
    userRef.current = user;
    return () => {
      mountedRef.current = false;
    };
  }, [user]);

  const {
    opponentConnected,
    problemsRef,
    player1SolvedRef,
    player2SolvedRef,
    currentPlayer,
    opponent,
    currentPlayerSolved,
    opponentSolved,
    battleCompletedRef
  } = useBattleSocket({
    socket,
    roomId,
    user,
    localBattle,
    setLocalBattle,
    setBattleStatus,
    dispatch,
    navigate
  });

  const fetchBattleData = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get(`/onevsone/battle/${roomId}`);
      console.log(res); 
      if (!mountedRef.current) return;

      const battleData = res.data;
      setLocalBattle(battleData);
      dispatch(setActiveBattle(battleData));
      setBattleStatus('active');

      if (battleData.winner) {
        battleCompletedRef.current = true;
        dispatch(setWinner(battleData.winner));
        dispatch(setActiveBattle(null));
        return;
      }

      if (battleData.endTime) {
        const now = new Date();
        const end = new Date(battleData.endTime);
        const secs = Math.max(0, Math.floor((end - now) / 1000));
        setTimeLeft(secs);
      }
    } catch (error) {
      console.error('Failed to fetch battle info', error);
      setBattleStatus('error');
      dispatch(setNotification({
        type: 'error',
        message: 'Failed to load battle. Checking status...'
      }));
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBattleData();
  }, [roomId]);

  useEffect(() => {
    if (timeLeft > 0 && !reduxWinner && battleStatus === 'active' && !battleCompletedRef.current) {
      const timer = setInterval(() => {
        setTimeLeft((s) => {
          if (s <= 1) {
            clearInterval(timer);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, reduxWinner, battleStatus]);

  const handleSolveProblem = useCallback((problemId) => {
    if (battleStatus !== 'active' || battleCompletedRef.current) {
      dispatch(setNotification({
        type: 'error',
        message: 'Battle is not active. Cannot solve problems.'
      }));
      return;
    }
    navigate(`/onevsone/battle/${roomId}/problem/${problemId}`);
  }, [battleStatus, roomId, navigate, dispatch]);

  if (isLoading || battleStatus === 'loading') {
    return <BattleLoading battleStatus={battleStatus} />;
  }

  if (battleStatus === 'not_found' || battleStatus === 'access_denied' || battleStatus === 'error') {
    return <BattleError battleStatus={battleStatus} />;
  }

  if (battleCancelled || battleStatus === 'cancelled') {
    return <BattleCancelled />;
  }

  if (reduxWinner) {
    return (
      <BattleWinner
        winner={reduxWinner}
        user={user}
        localBattle={localBattle}
        currentPlayerSolved={currentPlayerSolved}
        opponentSolved={opponentSolved}
        problemsCount={problemsRef.current.length}
        navigate={navigate}
      />
    );
  }

  if (!localBattle) {
    return <BattleLoading battleStatus="loading" />;
  }

  return (
    <div className="h-screen overflow-y-auto bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <BattleHeader
          localBattle={localBattle}
          opponentConnected={opponentConnected}
          timeLeft={timeLeft}
          battleStatus={battleStatus}
          formatTime={(seconds) => {
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PlayerCard
            player={user}
            isCurrentPlayer={true}
            solvedCount={currentPlayerSolved.length}
            totalProblems={problemsRef.current.length}
          />
          <PlayerCard
            player={opponent}
            isCurrentPlayer={false}
            solvedCount={opponentSolved.length}
            totalProblems={problemsRef.current.length}
          />
        </div>
        {console.log(problemsRef) }
        <ProblemList
          problems={problemsRef.current}
          currentPlayerSolved={currentPlayerSolved}
          opponentSolved={opponentSolved}
          battleStatus={battleStatus}
          onSolveProblem={handleSolveProblem}
        />
      </div>
    </div>
  );
};

export default BattlePage;