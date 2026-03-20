import React from 'react';
import { NavLink } from 'react-router';

const getDifficultyColor = (difficulty) => {
  const normalizedDifficulty = difficulty?.toLowerCase() || '';
  switch (normalizedDifficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'hard':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ProblemTable = ({ problems, loading, error, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-md border border-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-500 text-2xl mb-3">⚠️</div>
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Problems</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!problems.length) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
        <div className="text-gray-400 text-4xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No Problems Found</h3>
        <p className="text-gray-500">Create your first problem to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {problems.map((problem, index) => (
              <tr key={problem._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {problem.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-300">
                    {problem.tags}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => onDelete(problem._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemTable;