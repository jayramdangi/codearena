import React from 'react';
import { NavLink } from 'react-router';

const ProblemsPanel = ({ id, problems }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm overflow-hidden border-l-4 border-amber-500">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-gray-100">Problems</h2>
        <p className="text-gray-400 text-sm mt-1">
          {problems.length} problems to solve in this contest
        </p>
      </div>
     
      <div className="divide-y divide-gray-800">
        {problems.map((problem, index) => (
          <NavLink 
            key={problem._id}
            to={`/contest/${id}/${problem._id}`}
            className="block p-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 border border-amber-500/30">
                <span className="text-amber-300 font-medium">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-100 truncate">
                  {problem.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    problem.difficult === 'easy' 
                      ? 'bg-green-800 text-green-200' 
                      : problem.difficult === 'medium' 
                        ? 'bg-yellow-800 text-yellow-200' 
                        : 'bg-red-800 text-red-200'
                  }`}>
                    {problem.difficult?.charAt(0).toUpperCase() + problem.difficult?.slice(1)}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-800 text-amber-200">
                    {problem.tags}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProblemsPanel;