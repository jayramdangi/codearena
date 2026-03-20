import { NavLink } from 'react-router';

const ProblemRow = ({ problem, index, solvedProblems }) => {
  const isSolved = solvedProblems.some(sp => sp._id === problem._id);
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatTags = (tags) => {
    if (!tags) return [];
    return tags.split(',').map(tag => tag.trim());
  };

  const tags = formatTags(problem.tags);

  return (
    <div className="grid grid-cols-12 px-6 py-4 hover:bg-gray-800 transition-colors">
      <div className="col-span-1 flex items-center">
        {isSolved ? (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-white" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-gray-700"></div>
        )}
      </div>
      
      <div className="col-span-6">
        <NavLink 
          to={`/problem/${problem._id}`} 
          className="text-amber-300 hover:text-amber-400 font-medium transition-colors"
        >
          {index + 1 + ". " + (problem.title.length > 40 ? problem.title.slice(0, 40) + "..." : problem.title)}
        </NavLink>
      </div>
      
      <div className="col-span-3">
        <span
          className={`font-medium capitalize ${getDifficultyColor(problem.difficulty)}`}
        >
          {problem.difficulty}
        </span>
      </div>
      
      <div className="col-span-2">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag, tagIndex) => (
            <span 
              key={tagIndex} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-amber-300 bg-amber-900/30"
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-400">
              +{tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemRow;