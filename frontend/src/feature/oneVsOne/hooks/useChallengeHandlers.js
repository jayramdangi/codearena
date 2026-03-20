import { useCallback } from 'react';
import { emitSocket } from '../../../services/socketService';
import {
  addChallengeGiven,
  removeChallengeGiven,
  updateChallengeIncoming,
  removeChallengeIncoming,
  setNotification
} from '../../../store/onevsoneSlice.js';

export const useChallengeHandlers = (state, uiState, refs, setters) => {
  const { user, socket, dispatch, winner } = state;
  const { selectedTime, sendingChallenges, socketInitialized } = uiState;
  const { activeBattleRef } = refs;
  const { setActiveTab, setSendingChallenges } = setters;

  const handleSendChallenge = useCallback(async (challengedUser) => {
    if (sendingChallenges.has(challengedUser._id)) {
      dispatch(setNotification({
        type: 'error',
        message: 'Already sending challenge to this user'
      }));
      return;
    }

    if (!socket || !socket.connected) {
      dispatch(setNotification({
        type: 'error',
        message: 'Not connected to server. Please refresh.'
      }));
      return;
    }

    if (!socketInitialized) {
      dispatch(setNotification({
        type: 'error',
        message: 'Connection not ready. Please wait a moment.'
      }));
      return;
    }

    setSendingChallenges(prev => new Set(prev).add(challengedUser._id));

    const challenge = {
      _id: `challenge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      challenger: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId
      },
      challengedUser: {
        _id: challengedUser._id,
        firstName: challengedUser.firstName,
        lastName: challengedUser.lastName,
        emailId: challengedUser.emailId
      },
      status: 'pending',
      duration: selectedTime,
      createdAt: new Date().toISOString()
    };

    dispatch(addChallengeGiven(challenge));

    try {
      emitSocket('onevsone:sendChallenge', challenge);
      setActiveTab('given');
    } catch (err) {
      console.error('Failed to send challenge', err);
      dispatch(removeChallengeGiven(challenge._id));
      dispatch(setNotification({
        type: 'error',
        message: 'Failed to send challenge.'
      }));
    } finally {
      setTimeout(() => {
        setSendingChallenges(prev => {
          const newSet = new Set(prev);
          newSet.delete(challengedUser._id);
          return newSet;
        });
      }, 3000);
    }
  }, [socket, socketInitialized, selectedTime, user, dispatch, sendingChallenges, setActiveTab, setSendingChallenges]);

  const handleAcceptChallenge = useCallback((challenge) => {
    if (!socket || !socket.connected) {
      dispatch(setNotification({
        type: 'error',
        message: 'Not connected to server. Please refresh.'
      }));
      return;
    }

    if (activeBattleRef.current && !winner) {
      dispatch(setNotification({
        type: 'error',
        message: 'You already have an active battle. Please finish it first.'
      }));
      return;
    }

    dispatch(updateChallengeIncoming({
      challengeId: challenge._id,
      updates: { status: 'accepted' }
    }));

    try {
      emitSocket('onevsone:acceptChallenge', { challengeId: challenge._id });
      dispatch(setNotification({
        type: 'success',
        message: 'Challenge accepted! Starting battle...'
      }));
    } catch (err) {
      console.error('Accept failed', err);
      dispatch(setNotification({
        type: 'error',
        message: 'Failed to accept challenge.'
      }));
      dispatch(updateChallengeIncoming({
        challengeId: challenge._id,
        updates: { status: 'pending' }
      }));
    }
  }, [socket, winner, dispatch, activeBattleRef]);

  const handleRejectChallenge = useCallback((challengeId) => {
    if (!socket || !socket.connected) {
      dispatch(setNotification({
        type: 'error',
        message: 'Not connected to server. Please refresh.'
      }));
      return;
    }

    try {
      emitSocket('onevsone:rejectChallenge', { challengeId });
      dispatch(removeChallengeIncoming(challengeId));
      dispatch(setNotification({
        type: 'info',
        message: 'Challenge rejected.'
      }));
    } catch (err) {
      console.error('Reject failed', err);
      dispatch(setNotification({
        type: 'error',
        message: 'Failed to reject challenge.'
      }));
    }
  }, [socket, dispatch]);

  const handleCancelChallenge = useCallback((challengeId) => {
    if (!socket || !socket.connected) {
      dispatch(setNotification({
        type: 'error',
        message: 'Not connected to server. Please refresh.'
      }));
      return;
    }

    try {
      emitSocket('onevsone:cancelChallenge', { challengeId });
      dispatch(removeChallengeGiven(challengeId));
      dispatch(setNotification({
        type: 'info',
        message: 'Challenge canceled.'
      }));
    } catch (err) {
      console.error('Cancel failed', err);
      dispatch(setNotification({
        type: 'error',
        message: 'Failed to cancel challenge.'
      }));
    }
  }, [socket, dispatch]);

  return {
    handleSendChallenge,
    handleAcceptChallenge,
    handleRejectChallenge,
    handleCancelChallenge
  };
};