import React from 'react';

const UpcomingPanel = () => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm overflow-hidden border-l-4 border-amber-500">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-gray-100">Contest Not Started</h2>
      </div>
      <div className="p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-4 text-gray-400">
          The contest has not started yet. Problems will be available once the contest begins.
        </p>
      </div>
    </div>
  );
};

export default UpcomingPanel;