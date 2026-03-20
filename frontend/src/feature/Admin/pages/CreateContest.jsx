import React from 'react';
import ContestForm from '../components/ContestForm';

const CreateContest = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Contest</h1>
          <p className="text-gray-600">
            Organize a coding contest with selected problems
          </p>
        </div>
        
        <ContestForm />
      </div>
    </div>
  );
};

export default CreateContest;