import React from 'react';
import ProblemTable from '../components/ProblemTable';
import { useProblems } from '../hooks/useProblems';

const ManageProblems = () => {
  const { problems, loading, error, deleteProblem } = useProblems();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Problems</h1>
          <p className="text-gray-600">
            View, edit or delete existing coding problems
          </p>
        </div>
        
        <ProblemTable 
          problems={problems}
          loading={loading}
          error={error}
          onDelete={deleteProblem}
        />
      </div>
    </div>
  );
};

export default ManageProblems;