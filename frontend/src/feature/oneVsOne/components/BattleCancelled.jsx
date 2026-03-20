import React from 'react';

const BattleCancelled = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Battle Cancelled</h2>
        <p className="text-gray-400 mb-4">The battle has been cancelled.</p>
        <p className="text-gray-500 text-sm">Redirecting to challenges...</p>
      </div>
    </div>
  );
};

export default BattleCancelled;