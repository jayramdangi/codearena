import { useEffect } from 'react';
import axiosClient from '../../../services/api/axiosClient.js';
import {
  setConnectionStatus,
  setNotification,
  setWinner,
  clearNotification
} from '../../../store/onevsoneSlice.js';

export const useOneVsOneEffects = (state, uiState, refs, setters) => {
  const { challengesGiven, challengesIncoming, activeBattle, notification, winner, socket, dispatch } = state;
  const { setSocketInitialized } = setters;
  const { challengesGivenRef, challengesIncomingRef, activeBattleRef } = refs;

  // Debug state changes
  useEffect(() => {
    console.log('🔄 OneVsOne State Updated:', {
      challengesIncoming: challengesIncoming.length,
      challengesGiven: challengesGiven.length,
      activeBattle: !!activeBattle,
      notification: notification?.message
    });

    if (challengesIncoming.length > 0) {
      console.log('📋 Incoming Challenges:', challengesIncoming);
    }
  }, [challengesIncoming, challengesGiven, activeBattle, notification]);

  // Check opponent connections
  useEffect(() => {
    const checkOpponentConnections = async () => {
      if (!socket || !socket.connected) return;

      const allOpponents = new Set();

      challengesGivenRef.current.forEach(c => {
        if (c.challengedUser?._id && c.status === 'pending') {
          allOpponents.add(c.challengedUser._id);
        }
      });

      challengesIncomingRef.current.forEach(c => {
        if (c.challenger?._id && c.status === 'pending') {
          allOpponents.add(c.challenger._id);
        }
      });

      if (activeBattleRef.current?.opponent?._id) {
        allOpponents.add(activeBattleRef.current.opponent._id);
      }

      const checks = Array.from(allOpponents).map(async (id) => {
        try {
          const res = await axiosClient.get(`/onevsone/connection-status/${id}`);
          dispatch(setConnectionStatus({ userId: id, connected: res.data.connected }));
        } catch (e) {
          console.warn(`Failed to check connection status for ${id}:`, e);
          dispatch(setConnectionStatus({ userId: id, connected: false }));
        }
      });

      await Promise.allSettled(checks);
    };

    checkOpponentConnections();
    const interval = setInterval(checkOpponentConnections, 20000);
    return () => clearInterval(interval);
  }, [socket, dispatch, challengesGivenRef, challengesIncomingRef, activeBattleRef]);

  // Auto-clear notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  // Clear winner after timeout
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        dispatch(setWinner(null));
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [winner, dispatch]);

  // Update socket initialized state (already in useOneVsOneState, but kept here for completeness)
  useEffect(() => {
    if (socket?.connected) {
      setSocketInitialized(true);
    } else {
      setSocketInitialized(false);
    }
  }, [socket?.connected, setSocketInitialized]);

  return null;
};