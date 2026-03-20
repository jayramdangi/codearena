import React from 'react';
import { useOneVsOneState } from '../hooks/useOneVsOneState';
import { useChallengeHandlers } from '../hooks/useChallengeHandlers';
import { useBattleHandlers } from '../hooks/useBattleHandlers';
import { useOneVsOneEffects } from '../hooks/useOneVsOneEffects';

import HeaderSection from '../components/HeaderSection';
import SettingsPanel from '../components/SettingsPanel';
import ChallengesPanel from '../components/ChallengesPanel';
import ChallengeInfoModal from '../components/ChallengeInfoModal';

const OneVsOneMainPage = () => {
  // Use custom hooks
  const {
    state,
    uiState,
    refs,
    setters
  } = useOneVsOneState();

  const {
    handleSendChallenge,
    handleAcceptChallenge,
    handleRejectChallenge,
    handleCancelChallenge
  } = useChallengeHandlers(state, uiState, refs, setters);

  const {
    handleJoinBattle,
    handleCancelBattle
  } = useBattleHandlers(state, refs);

  useOneVsOneEffects(state, uiState, refs, setters);

  const {
    user,
    challengesGiven,
    challengesIncoming,
    activeBattle,
    connectionStatus,
    notification,
    loading,
    winner
  } = state;

  const {
    activeTab,
    selectedTime,
    showInfoModal,
    sendingChallenges,
    socketInitialized
  } = uiState;

  const opponentName = activeBattle?.opponent ?
    `${activeBattle.opponent.firstName || ''} ${activeBattle.opponent.lastName || ''}`.trim() : 'Opponent';

  console.log('🔍 OneVsOne State:', {
    challengesIncoming,
    challengesGiven,
    activeBattle,
    notification
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <HeaderSection onShowInfo={() => setters.setShowInfoModal(true)} />
        
        <div className="flex flex-col lg:flex-row gap-4">
          <SettingsPanel
            selectedTime={selectedTime}
            onSelectTime={setters.setSelectedTime}
            activeBattle={activeBattle}
            winner={winner}
            connectionStatus={connectionStatus}
            socket={state.socket}
            opponentName={opponentName}
            onJoinBattle={handleJoinBattle}
            onCancelBattle={handleCancelBattle}
          />
          
          <ChallengesPanel
            activeTab={activeTab}
            onTabChange={setters.setActiveTab}
            challengesGiven={challengesGiven}
            challengesIncoming={challengesIncoming}
            loading={loading}
            notification={notification}
            connectionStatus={connectionStatus}
            onAcceptChallenge={handleAcceptChallenge}
            onRejectChallenge={handleRejectChallenge}
            onCancelChallenge={handleCancelChallenge}
            onSendChallenge={handleSendChallenge}
            activeBattle={activeBattle}
            winner={winner}
            user={user}
            selectedTime={selectedTime}
          />
        </div>
      </div>

      <ChallengeInfoModal
        isOpen={showInfoModal}
        onClose={() => setters.setShowInfoModal(false)}
      />
    </div>
  );
};

export default OneVsOneMainPage;