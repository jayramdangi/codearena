const DifficultyFilter = ({ filters, handleFilterChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Difficulty</h3>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => handleFilterChange('difficulty', 'all')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.difficulty === 'all' 
              ? 'bg-amber-500 text-gray-900 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => handleFilterChange('difficulty', 'easy')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.difficulty === 'easy' 
              ? 'bg-green-800 text-green-200 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          Easy
        </button>
        <button 
          onClick={() => handleFilterChange('difficulty', 'medium')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.difficulty === 'medium' 
              ? 'bg-yellow-800 text-yellow-200 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          Medium
        </button>
        <button 
          onClick={() => handleFilterChange('difficulty', 'hard')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.difficulty === 'hard' 
              ? 'bg-red-800 text-red-200 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultyFilter;