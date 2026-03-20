import useProfileData from '../hooks/useProfileData';
import UserProfileCard from '../components/UserProfileCard';
import OverallProgressCard from '../components/OverallProgressCard';
import ContestSection from '../components/ContestSection';
import SolvedProblemsTable from '../components/SolvedProblemsTable';
import StatsSummary from '../components/StatsSummary';

const ProfilePage = () => {
  const { user, solvedProblems, loading, error, stats } = useProfileData();

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
    <div className="h-screen overflow-y-scroll pb-30 bg-gray-950 py-10 px-4 text-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-300 mb-8">
          Dashboard
        </h1>

        {/* User Card and Overall Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <UserProfileCard user={user} />
          <OverallProgressCard stats={stats} />
        </div>

        {/* Contest Section */}
        <ContestSection contests={user?.contest} />

        {/* Solved Problems Table */}
        <SolvedProblemsTable solvedProblems={solvedProblems} />

        {/* Stats Summary */}
        <StatsSummary stats={stats} />
      </div>
    </div>
  );
};

export default ProfilePage;