import React from 'react';

const HeaderSection = ({ onShowInfo }) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-amber-300 mb-2">
        Challenge a Friend
      </h1>
      <p className="text-sm text-gray-400 max-w-3xl mx-auto mb-3">
        Test your coding skills against friends in real-time head-to-head battles
      </p>
      <button
        onClick={onShowInfo}
        className="px-4 py-1.5 bg-transparent border-2 border-amber-500 text-amber-400 font-semibold rounded-lg hover:bg-gray-800 hover:border-amber-400 transition-colors text-xs"
      >
        How It Works
      </button>
    </div>
  );
};

export default HeaderSection;