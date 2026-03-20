import { useCallback } from 'react';
import { emitSocket } from '../../../services/socketService.js';
import { setNotification } from '../../../store/onevsoneSlice.js';

export const useBattleHandlers = (state, refs) => {
  const { activeBattle, socket, navigate, dispatch } = state;

  const handleJoinBattle = useCallback(() => {
    if (activeBattle?.roomId) {
      navigate(`/onevsone/battle/${activeBattle.roomId}`);
    } else {
      dispatch(setNotification({
        type: 'error',
        message: 'No active battle found.'
      }));
    }
  }, [activeBattle, navigate, dispatch]);

  const handleCancelBattle = useCallback(() => {
    if (!socket || !socket.connected) {
      dispatch(setNotification({
        type: 'error',
        message: 'Not connected to server. Please refresh.'
      }));
      return;
    }

    if (activeBattle?.roomId) {
      try {
        emitSocket('onevsone:cancelBattle', {
          roomId: activeBattle.roomId,
          challengeId: activeBattle.challengeId
        });
        dispatch(setNotification({
          type: 'info',
          message: 'Battle cancelled.'
        }));
      } catch (err) {
        console.error('Cancel battle failed', err);
        dispatch(setNotification({
          type: 'error',
          message: 'Failed to cancel battle.'
        }));
      }
    } else {
      dispatch(setNotification({
        type: 'error',
        message: 'No active battle to cancel.'
      }));
    }
  }, [socket, activeBattle, dispatch]);

  return {
    handleJoinBattle,
    handleCancelBattle
  };
};