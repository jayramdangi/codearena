const EmptyState = () => {
  return (
    <div className="text-center py-12 text-gray-400">
      <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-16 h-16 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-300">No problems found</h3>
      <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
    </div>
  );
};

export default EmptyState;