import React, { useMemo } from 'react';
import { useParams, NavLink } from 'react-router';
import { useContest } from '../hooks/useContest';
import Timer from '../components/Timer';
import ProblemsPanel from '../components/ProblemsPanel';
import LeaderboardPanel from '../components/LeaderboardPanel';
import UpcomingPanel from '../components/UpcomingPanel';
import { parseISO, addMinutes } from 'date-fns';
import ContestInstructions from '../components/ContestInstructions';
const ContestProblem = () => {
  const { id } = useParams();

  const { contest, problems, leaderboard, loading, error } = useContest(id);

  // ✅ Memoize dates (CRITICAL FIX)
  const startDate = useMemo(() => {
    if (!contest?.startTime) return null;
    return parseISO(contest.startTime);
  }, [contest?.startTime]);

  const endDate = useMemo(() => {
    if (!startDate || !contest?.duration) return null;
    return addMinutes(startDate, contest.duration);
  }, [startDate, contest?.duration]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="text-center p-8 bg-gray-900 rounded-2xl shadow-sm max-w-md">
          <div className="text-2xl text-red-400 mb-4">Error</div>
          <p className="text-gray-400 mb-6">{error}</p>
          <NavLink
            to="/contest"
            className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 transition-colors font-medium"
          >
            Back to Contests
          </NavLink>
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Contest Not Found</h2>
          <p className="text-gray-400 mb-6">
            The contest you're looking for doesn't exist or has been removed.
          </p>
          <NavLink
            to="/contest"
            className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 transition-colors font-medium"
          >
            Browse Contests
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Contest Header */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-amber-300">
                {contest.title}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {/* ✅ Pass only memoized dates */}
                {startDate && endDate && (
                  <Timer startDate={startDate} endDate={endDate} />
                )}

                <span className="flex items-center bg-gray-800 px-3 py-2 rounded-lg text-gray-300">
                  {contest.duration} minutes
                </span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-3">
              <NavLink
                to={`/contest/leaderboard/${id}`}
                className="flex items-center bg-amber-500 hover:bg-amber-400 text-gray-900 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                View Leaderboard
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
          
            <ContestInstructions contest={contest} problemsCount={problems?.length|| 0}/>

          </div>

          <div className="lg:col-span-1">
            {contest.status === 'active' && (
              <ProblemsPanel id={id} problems={problems} />
            )}

            {contest.status === 'active' && leaderboard.length > 0 && (
              <LeaderboardPanel id={id} leaderboard={leaderboard} />
            )}

            {contest.status === 'upcoming' && <UpcomingPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestProblem;
