const StatusFilter = ({ filters, handleFilterChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Status</h3>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => handleFilterChange('status', 'all')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.status === 'all' 
              ? 'bg-amber-500 text-gray-900 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          All Problems
        </button>
        <button 
          onClick={() => handleFilterChange('status', 'solved')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.status === 'solved' 
              ? 'bg-amber-500 text-gray-900 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          Solved
        </button>
        <button 
          onClick={() => handleFilterChange('status', 'unsolved')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.status === 'unsolved' 
              ? 'bg-amber-500 text-gray-900 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          Unsolved
        </button>
      </div>
    </div>
  );
};

export default StatusFilter;