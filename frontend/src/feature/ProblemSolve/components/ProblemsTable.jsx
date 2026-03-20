import ProblemRow from './ProblemRow';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

const ProblemsTable = ({ filteredProblems, solvedProblems }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm overflow-hidden border-l-4 border-amber-500">
      <div className="grid grid-cols-12 bg-gray-800 text-gray-400 text-sm font-medium px-6 py-4 border-b border-gray-700">
        <div className="col-span-1">Status</div>
        <div className="col-span-6">Title</div>
        <div className="col-span-3">Difficulty</div>
        <div className="col-span-2">Tags</div>
      </div>
      
      {filteredProblems.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="divide-y divide-gray-800">
            {filteredProblems.map((problem, index) => (
              <ProblemRow 
                key={problem._id} 
                problem={problem} 
                index={index}
                solvedProblems={solvedProblems}
              />
            ))}
          </div>
          
          <Pagination totalItems={filteredProblems.length} />
        </>
      )}
    </div>
  );
};

export default ProblemsTable;