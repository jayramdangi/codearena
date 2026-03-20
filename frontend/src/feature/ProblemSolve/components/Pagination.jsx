import { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-800 px-6 py-4 text-gray-400 bg-gray-800">
      <div className="text-sm text-gray-400">
        Showing <span className="font-medium text-gray-300">{startItem}</span> to{' '}
        <span className="font-medium text-gray-300">{endItem}</span> of{' '}
        <span className="font-medium text-gray-300">{totalItems}</span> results
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg border border-gray-700 text-sm font-medium transition-colors ${
            currentPage === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-700 hover:text-gray-200'
          }`}
        >
          Previous
        </button>
        
        {[...Array(Math.min(3, totalPages))].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded-lg border border-gray-700 text-sm font-medium ${
                currentPage === pageNum
                  ? 'bg-amber-500 text-gray-900'
                  : 'hover:bg-gray-700 hover:text-gray-200 transition-colors'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        
        {totalPages > 3 && (
          <span className="px-3 py-1 text-gray-400">...</span>
        )}
        
        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-lg border border-gray-700 text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-700 hover:text-gray-200'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;