import React from 'react';
import { useContests } from '../hooks/useContests';
import ContestFilters from '../components/ContestFilters';
import ContestCard from '../components/ContestCard';

const ContestPage = () => {
  const { 
    contests, 
    filteredContests, 
    loading, 
    filter, 
    setFilter, 
    searchTerm, 
    setSearchTerm 
  } = useContests();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-300 mb-4">
              Coding Contests
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Test your skills against other developers in our competitive programming contests. 
              Win prizes and climb the leaderboard!
            </p>
          </div>
          
          {/* Filter Section */}
          <ContestFilters 
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          )}
          
          {/* Empty State */}
          {!loading && filteredContests.length === 0 && (
            <div className="text-center py-12 bg-gray-900 rounded-2xl shadow-sm">
              <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-16 h-16 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-100">No contests found</h3>
              <p className="mt-1 text-gray-400">
                {filter === 'upcoming' 
                  ? 'Check back later for upcoming contests.' 
                  : 'No contests match your current filters.'}
              </p>
            </div>
          )}
          
          {/* Contest Grid */}
          {!loading && filteredContests.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
              {filteredContests.map((contest) => (
                <ContestCard key={contest._id} contest={contest} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestPage;