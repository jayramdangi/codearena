import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSocket } from '../../../context/SocketContext';

export const useOneVsOneState = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  // Redux state
  const { user } = useSelector((state) => state.auth);
  const {
    challengesGiven,
    challengesIncoming,
    activeBattle,
    connectionStatus,
    notification,
    loading,
    winner
  } = useSelector((state) => state.onevsone);

  // Local UI state
  const [activeTab, setActiveTab] = useState('search');
  const [selectedTime, setSelectedTime] = useState(10);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [sendingChallenges, setSendingChallenges] = useState(new Set());
  const [socketInitialized, setSocketInitialized] = useState(false);

  // Refs
  const userRef = useRef(user);
  const activeBattleRef = useRef(activeBattle);
  const challengesIncomingRef = useRef(challengesIncoming);
  const challengesGivenRef = useRef(challengesGiven);

  // Update refs when state changes
  useEffect(() => {
    userRef.current = user;
    activeBattleRef.current = activeBattle;
    challengesIncomingRef.current = challengesIncoming;
    challengesGivenRef.current = challengesGiven;
  }, [user, activeBattle, challengesIncoming, challengesGiven]);

  // Update socket initialized state
  useEffect(() => {
    if (socket?.connected) {
      setSocketInitialized(true);
    } else {
      setSocketInitialized(false);
    }
  }, [socket?.connected]);

  return {
    state: {
      user,
      challengesGiven,
      challengesIncoming,
      activeBattle,
      connectionStatus,
      notification,
      loading,
      winner,
      socket,
      navigate,
      dispatch
    },
    uiState: {
      activeTab,
      selectedTime,
      showInfoModal,
      sendingChallenges,
      socketInitialized
    },
    refs: {
      userRef,
      activeBattleRef,
      challengesIncomingRef,
      challengesGivenRef
    },
    setters: {
      setActiveTab,
      setSelectedTime,
      setShowInfoModal,
      setSendingChallenges,
      setSocketInitialized
    }
  };
};