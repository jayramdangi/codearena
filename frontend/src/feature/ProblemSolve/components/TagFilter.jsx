const TagFilter = ({ filters, handleFilterChange, expandedTags, setExpandedTags, visibleTags }) => {
  const formatTagName = (tag) => {
    return tag.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-100">Problem Tags</h3>
        <button 
          onClick={() => setExpandedTags(!expandedTags)}
          className="text-sm text-amber-400 hover:text-amber-300 font-medium"
        >
          {expandedTags ? 'Show Less' : 'Show More'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => handleFilterChange('tag', 'all')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filters.tag === 'all' 
              ? 'bg-amber-500 text-gray-900 font-medium' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
          }`}
        >
          All Tags
        </button>
        {visibleTags.map(tag => (
          <button
            key={tag}
            onClick={() => handleFilterChange('tag', tag)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filters.tag === tag 
                ? 'bg-amber-500 text-gray-900 font-medium' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100'
            }`}
          >
            {formatTagName(tag)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;