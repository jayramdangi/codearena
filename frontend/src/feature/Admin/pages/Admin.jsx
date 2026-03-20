import React from 'react';
import { NavLink } from 'react-router';

const Admin = () => {
  const adminCards = [
    {
      title: 'Create Problem',
      description: 'Add new coding problems to the platform',
      icon: '📝',
      path: '/admin/create',
      color: 'bg-blue-500'
    },
    {
      title: 'Create Contest',
      description: 'Organize coding contests with multiple problems',
      icon: '🏆',
      path: '/admin/createContest',
      color: 'bg-amber-500'
    },
    {
      title: 'Manage Problems',
      description: 'View, edit or delete existing problems',
      icon: '📋',
      path: '/admin/delete',
      color: 'bg-green-500'
    },
    {
      title: 'Manage Videos',
      description: 'Upload or delete video solutions',
      icon: '🎬',
      path: '/admin/video',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage problems, contests, and video solutions from this dashboard
          </p>
        </div>

        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminCards.map((card, index) => (
            <NavLink
              key={index}
              to={card.path}
              className="block"
            >
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="flex items-start">
                  <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Go to {card.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Total Problems</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-3xl font-bold text-amber-600 mb-2">25+</div>
              <div className="text-gray-600">Active Contests</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">75+</div>
              <div className="text-gray-600">Video Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;