import React from 'react';
import ProblemForm from '../components/ProblemForm';

const CreateProblem = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Problem</h1>
          <p className="text-gray-600">
            Add a new coding problem with test cases and code templates
          </p>
        </div>
        
        <ProblemForm />
      </div>
    </div>
  );
};

export default CreateProblem;