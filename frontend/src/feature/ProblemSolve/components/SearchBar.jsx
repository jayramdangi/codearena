const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-900 text-gray-100 pl-12 pr-4 py-3 rounded-2xl border border-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder-gray-400 transition-all"
        />
        <svg 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
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
      </div>
    </div>
  );
};

export default SearchBar;