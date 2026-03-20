import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/authSlice';
import useProblemsData from '../hooks/useProblemsData';
import { useProblemsFilter } from '../hooks/useProblemsFilter';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import DifficultyFilter from '../components/DifficultyFilter';
import ActiveFilters from '../components/ActiveFilters';
import TagFilter from '../components/TagFilter';
import ProblemsTable from '../components/ProblemsTable';

const ProblemsPage = () => {
  const dispatch = useDispatch();
  const { problems, solvedProblems, loading, error, user } = useProblemsData();
  
  const {
    filters,
    searchTerm,
    setSearchTerm,
    expandedTags,
    setExpandedTags,
    visibleTags,
    filteredProblems,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters
  } = useProblemsFilter(problems, solvedProblems, user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide pb-20 bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-300 mb-3">
            Practice Coding Problems
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sharpen your coding skills with our curated collection of problems. 
            Filter by difficulty, topic, or status to find your next challenge.
          </p>
        </div>
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="bg-gray-900 rounded-2xl shadow-sm p-6 mb-8 border-l-4 border-amber-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatusFilter 
              filters={filters} 
              handleFilterChange={handleFilterChange} 
            />
            
            <DifficultyFilter 
              filters={filters} 
              handleFilterChange={handleFilterChange} 
            />
            
            <ActiveFilters 
              filters={filters} 
              handleClearFilter={handleClearFilter}
              handleClearAllFilters={handleClearAllFilters}
            />
          </div>
          
          <TagFilter 
            filters={filters}
            handleFilterChange={handleFilterChange}
            expandedTags={expandedTags}
            setExpandedTags={setExpandedTags}
            visibleTags={visibleTags}
          />
        </div>
        
        <ProblemsTable 
          filteredProblems={filteredProblems}
          solvedProblems={solvedProblems}
        />
      </div>
    </div>
  );
};

export default ProblemsPage;