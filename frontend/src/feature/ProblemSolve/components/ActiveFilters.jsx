const ActiveFilters = ({ filters, handleClearFilter, handleClearAllFilters }) => {
  const hasActiveFilters = filters.status !== 'all' || filters.difficulty !== 'all' || filters.tag !== 'all';

  if (!hasActiveFilters) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-100">Active Filters</h3>
        <button 
          onClick={handleClearAllFilters}
          className="text-sm text-amber-400 hover:text-amber-300 font-medium"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.status !== 'all' && (
          <div className="px-3 py-1 bg-amber-500 text-gray-900 text-sm rounded-full flex items-center font-medium">
            {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
            <button 
              onClick={() => handleClearFilter('status')}
              className="ml-1 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        )}
        {filters.difficulty !== 'all' && (
          <div className={`px-3 py-1 text-sm rounded-full flex items-center font-medium ${
            filters.difficulty === 'easy' ? 'bg-green-800 text-green-200' :
            filters.difficulty === 'medium' ? 'bg-yellow-800 text-yellow-200' :
            'bg-red-800 text-red-200'
          }`}>
            {filters.difficulty.charAt(0).toUpperCase() + filters.difficulty.slice(1)}
            <button 
              onClick={() => handleClearFilter('difficulty')}
              className="ml-1 hover:text-gray-300"
            >
              ×
            </button>
          </div>
        )}
        {filters.tag !== 'all' && (
          <div className="px-3 py-1 bg-amber-800 text-amber-200 text-sm rounded-full flex items-center font-medium">
            {filters.tag}
            <button 
              onClick={() => handleClearFilter('tag')}
              className="ml-1 hover:text-amber-100"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;