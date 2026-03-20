import React from 'react';
import { NavLink } from 'react-router';

const BattleError = ({ battleStatus }) => {
  const getErrorMessage = () => {
    switch (battleStatus) {
      case 'not_found':
        return {
          title: 'Battle Not Found',
          message: 'The battle you are looking for does not exist or has been cancelled.'
        };
      case 'access_denied':
        return {
          title: 'Access Denied',
          message: 'You do not have permission to access this battle.'
        };
      default:
        return {
          title: 'Error Loading Battle',
          message: 'There was an error loading the battle.'
        };
    }
  };

  const { title, message } = getErrorMessage();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">{title}</h2>
        <p className="text-gray-400 mb-4">{message}</p>
        <NavLink to="/onevsone" className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 transition">
          Back to Battles
        </NavLink>
      </div>
    </div>
  );
};

export default BattleError;