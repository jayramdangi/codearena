import React from 'react';
import Search from './Search';
import ChallengeCard from '../components/ChallengeCard';

const ChallengesPanel = ({
  activeTab,
  onTabChange,
  challengesGiven,
  challengesIncoming,
  loading,
  notification,
  connectionStatus,
  onAcceptChallenge,
  onRejectChallenge,
  onCancelChallenge,
  onSendChallenge,
  activeBattle,
  winner,
  user,
  selectedTime
}) => {
  return (
    <div className="lg:w-3/4">
      <div className="bg-gray-900 rounded-xl shadow-lg p-4 border-2 border-amber-500/50 shadow-amber-500/20 h-full">
        {notification && (
          <div className={`mb-3 p-3 rounded-lg text-center text-sm ${
            notification.type === 'success'
              ? 'bg-green-900/30 text-green-400 border border-green-800'
              : notification.type === 'error'
                ? 'bg-red-900/30 text-red-400 border border-red-800'
                : notification.type === 'warning'
                  ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'
                  : 'bg-blue-900/30 text-blue-400 border border-blue-800'
          }`}>
            {notification.message}
          </div>
        )}

        <Tabs activeTab={activeTab} onTabChange={onTabChange} challengesGiven={challengesGiven} challengesIncoming={challengesIncoming} />

        <div className="min-h-[300px]">
          {activeTab === 'search' && (
            <div>
              <h2 className="text-lg font-bold text-amber-300 mb-3">Find Players to Challenge</h2>
              <Search onSendChallenge={onSendChallenge} />
            </div>
          )}

          {activeTab === 'given' && (
            <ChallengeList
              type="given"
              challenges={challengesGiven}
              loading={loading}
              connectionStatus={connectionStatus}
              onCancelChallenge={onCancelChallenge}
              activeBattle={activeBattle}
            />
          )}

          {activeTab === 'incoming' && (
            <ChallengeList
              type="incoming"
              challenges={challengesIncoming}
              loading={loading}
              connectionStatus={connectionStatus}
              onAcceptChallenge={onAcceptChallenge}
              onRejectChallenge={onRejectChallenge}
              activeBattle={activeBattle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Tabs = ({ activeTab, onTabChange, challengesGiven, challengesIncoming }) => (
  <div className="flex border-b border-gray-800 mb-4">
    {["search", "given", "incoming"].map((tab) => (
      <button
        key={tab}
        className={`py-2 px-4 font-medium text-sm ${
          activeTab === tab
            ? 'text-amber-400 border-b-2 border-amber-400'
            : 'text-gray-500 hover:text-gray-300'
        }`}
        onClick={() => onTabChange(tab)}
      >
        {tab === 'search' && <>🔍 Search Players</>}
        {tab === 'given' && <>📤 Sent {challengesGiven.length > 0 && (
          <span className="ml-1 bg-amber-500 text-gray-900 text-xs font-semibold px-1.5 py-0.5 rounded-full">
            {challengesGiven.length}
          </span>
        )}</>}
        {tab === 'incoming' && <>📥 Received {challengesIncoming.length > 0 && (
          <span className="ml-1 bg-amber-500 text-gray-900 text-xs font-semibold px-1.5 py-0.5 rounded-full">
            {challengesIncoming.length}
          </span>
        )}</>}
      </button>
    ))}
  </div>
);

const ChallengeList = ({
  type,
  challenges,
  loading,
  connectionStatus,
  onAcceptChallenge,
  onRejectChallenge,
  onCancelChallenge,
  activeBattle
}) => {
  const title = type === 'given' ? 'Your Sent Challenges' : 'Challenge Requests';
  const emptyMessage = type === 'given' ? 'No challenges sent yet' : 'No incoming challenges';

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-400 text-sm mt-2">Loading challenges...</p>
      </div>
    );
  }

  if (challenges.length === 0) {
    return <p className="text-center text-gray-400 text-sm py-8">{emptyMessage}</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-amber-300 mb-3">{title}</h2>
      <div className="space-y-2">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            type={type}
            onAccept={onAcceptChallenge}
            onReject={onRejectChallenge}
            onCancel={onCancelChallenge}
            duration={challenge.duration || 10}
            connectionStatus={connectionStatus[type === 'given' ? challenge.challengedUser?._id : challenge.challenger?._id]}
            activeBattle={activeBattle}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengesPanel;