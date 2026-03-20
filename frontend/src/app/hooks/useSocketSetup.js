import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSocket } from '../../context/SocketContext';
import { 
  fetchOneVsOneInitial,
  addChallengeIncoming,
  addChallengeGiven,
  removeChallengeGiven,
  removeChallengeIncoming,
  setActiveBattle,
  setConnectionStatus,
  setNotification,
  setBattleCancelled,
  setWinner,
  clearNotification
} from '../../store/onevsoneSlice';

export const useSocketSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const socket = useSocket();
  
  const userRef = useRef(user);
  const socketSetupRef = useRef(false);

  // Fetch initial OneVsOne data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(fetchOneVsOneInitial());
    }
  }, [isAuthenticated, user?._id, dispatch]);

  // Keep user ref updated
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Socket setup
  useEffect(() => {
    if (!socket) return;

    const identifyUser = () => {
      if (socket.connected && userRef.current?._id) {
        try {
          socket.emit('onevsone:identify', userRef.current._id);
        } catch (e) {
          console.warn('Socket identify failed:', e);
        }
      }
    };

    if (socket.connected) {
      identifyUser();
    } else {
      socket.on('connect', identifyUser);
    }

    if (socketSetupRef.current) {
      return () => {
        socket.off('connect', identifyUser);
      };
    }

    socketSetupRef.current = true;

    // Event handlers
    const handleChallengeReceived = (challenge) => {
      dispatch(addChallengeIncoming(challenge));
      dispatch(setNotification({
        type: 'info',
        message: `New challenge from ${challenge.challenger?.firstName || 'Unknown'}!`
      }));
    };

    const handleChallengeAccepted = (battleData) => {
      dispatch(setActiveBattle(null));
      dispatch(setWinner(null));
      dispatch(setBattleCancelled(false));
      dispatch(setActiveBattle(battleData));

      if (battleData.challengeId) {
        dispatch(removeChallengeIncoming(battleData.challengeId));
        dispatch(removeChallengeGiven(battleData.challengeId));
      }

      dispatch(clearNotification());

      setTimeout(() => {
        if (battleData.roomId) {
          navigate(`/onevsone/battle/${battleData.roomId}`);
        } else {
          dispatch(setNotification({
            type: 'error',
            message: 'Failed to start battle: No room ID'
          }));
        }
      }, 250);
    };

    const handleChallengeRejected = (data) => {
      const challengeId = data.challengeId || data;
      dispatch(removeChallengeGiven(challengeId));
      dispatch(removeChallengeIncoming(challengeId));
      dispatch(setNotification({
        type: 'info',
        message: 'Challenge was rejected'
      }));
    };

    const handleChallengeCanceled = (data) => {
      const challengeId = data.challengeId || data;
      dispatch(removeChallengeGiven(challengeId));
      dispatch(removeChallengeIncoming(challengeId));
      dispatch(setNotification({
        type: 'info',
        message: 'Challenge was canceled'
      }));
    };

    const handleBattleCanceled = (data) => {
      dispatch(setActiveBattle(null));
      dispatch(setBattleCancelled(true));
      dispatch(setWinner(null));

      if (data.challengeId) {
        dispatch(removeChallengeGiven(data.challengeId));
        dispatch(removeChallengeIncoming(data.challengeId));
      }

      dispatch(setNotification({
        type: 'info',
        message: data?.message || 'Battle was canceled'
      }));
    };

    const handleBattleCompleted = (data) => {
      dispatch(setActiveBattle(null));
      dispatch(setWinner(data.winner));
      dispatch(setBattleCancelled(false));

      if (data.winner === 'tie') {
        dispatch(setNotification({
          type: 'info',
          message: 'Battle ended in a tie! Great game!'
        }));
      } else if (data.winner === userRef.current?._id) {
        dispatch(setNotification({
          type: 'success',
          message: '🎉 Congratulations! You won the battle!'
        }));
      } else {
        dispatch(setNotification({
          type: 'info',
          message: 'Battle completed. Better luck next time!'
        }));
      }

      setTimeout(() => {
        dispatch(setWinner(null));
      }, 10000);
    };

    const handleUserConnectionStatus = ({ userId, connected }) => {
      dispatch(setConnectionStatus({ userId, connected }));
    };

    const handleBattleStarted = (battleData) => {
      dispatch(setActiveBattle(battleData));
      dispatch(setNotification({
        type: 'success',
        message: 'Battle started! Good luck!'
      }));
    };

    const handleUserOffline = (data) => {
      dispatch(setNotification({
        type: 'warning',
        message: data?.message || 'User is currently offline'
      }));
    };

    const handleChallengeSent = (data) => {
      dispatch(setNotification({
        type: 'success',
        message: 'Challenge sent successfully!'
      }));
    };

    const handleUserIdentified = (data) => {
      
    };

    
    const events = [
      ['onevsone:challengeReceived', handleChallengeReceived],
      ['onevsone:challengeAccepted', handleChallengeAccepted],
      ['onevsone:challengeRejected', handleChallengeRejected],
      ['onevsone:challengeCanceled', handleChallengeCanceled],
      ['onevsone:battleCanceled', handleBattleCanceled],
      ['battle:completed', handleBattleCompleted],
      ['onevsone:userConnectionStatus', handleUserConnectionStatus],
      ['battle:started', handleBattleStarted],
      ['onevsone:userOffline', handleUserOffline],
      ['onevsone:challengeSent', handleChallengeSent],
      ['onevsone:userIdentified', handleUserIdentified]
    ];

    events.forEach(([event, handler]) => {
      socket.off(event);
      socket.on(event, handler);
    });

    // Cleanup
    return () => {
      events.forEach(([event, handler]) => socket.off(event, handler));
      socket.off('connect', identifyUser);
      socketSetupRef.current = false;
    };
  }, [socket, dispatch, navigate]);
};