import React from 'react';

const ContestFilters = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-gray-900 rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filter === 'all' 
              ? 'bg-amber-500 text-gray-900 font-semibold' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          All Contests
        </button>
        <button 
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filter === 'upcoming' 
              ? 'bg-amber-500 text-gray-900 font-semibold' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setFilter('past')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filter === 'past' 
              ? 'bg-amber-500 text-gray-900 font-semibold' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          Past Contests
        </button>
      </div>
      
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search contests..."
          className="bg-gray-800 text-gray-100 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder-gray-400 transition-all w-full sm:w-64"
        />
        <svg 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ContestFilters;