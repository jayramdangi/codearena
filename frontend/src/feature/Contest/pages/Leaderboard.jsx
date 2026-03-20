import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axiosClient from '../../../services/api/axiosClient';
import { format } from 'date-fns';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const contestId = params.id;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/contest/${contestId}/leaderboard`);
        setLeaderboardData(response.data);
      } catch (err) {
        setError('Failed to load leaderboard data');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [contestId]);

  const formatDate = (dateString) =>
    format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
        <div className="bg-red-900/30 border border-red-800 rounded-xl p-6 text-center max-w-md w-full">
          <div className="text-red-400 text-4xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Error Loading Leaderboard</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!leaderboardData?.leaderboard?.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center max-w-md w-full">
          <div className="text-amber-400 text-5xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-amber-300 mb-2">No Leaderboard Data Yet</h3>
          <p className="text-gray-400">The contest hasn't started or no one has submitted yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8 border border-gray-700 rounded-2xl bg-gray-900">
        {/* Header */}
        <div className="bg-gray-800 rounded-t-2xl p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-300">
            {leaderboardData.title}
          </h1>
          <div className="flex items-center mt-2 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatDate(leaderboardData.startTime)}</span>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-amber-500/20 text-amber-300 px-4 py-2 rounded-lg font-medium border border-amber-500/30">
              {leaderboardData.leaderboard.length} participants
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex justify-center">
          <div className="w-full bg-gray-900 rounded-b-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {leaderboardData.leaderboard.map((entry, idx) => (
                    <tr
                      key={entry.user._id}
                      className={idx < 3 ? "bg-gray-800/50" : "hover:bg-gray-800/30"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                              idx === 0
                                ? 'bg-amber-500 shadow-lg shadow-amber-500/30'
                                : idx === 1
                                ? 'bg-gray-400 shadow-lg shadow-gray-400/30'
                                : idx === 2
                                ? 'bg-amber-700 shadow-lg shadow-amber-700/30'
                                : 'bg-gray-800 border border-gray-700'
                            }`}
                          >
                            <span
                              className={`font-bold ${
                                idx === 0
                                  ? 'text-gray-900'
                                  : idx === 1
                                  ? 'text-gray-900'
                                  : idx === 2
                                  ? 'text-amber-100'
                                  : 'text-gray-300'
                              }`}
                            >
                              {idx + 1}
                            </span>
                          </div>
                          {idx < 3 && (
                            <span className="ml-3 text-xs font-semibold text-gray-400">
                              {idx === 0 ? 'Gold' : idx === 1 ? 'Silver' : 'Bronze'}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-10 h-10 flex items-center justify-center">
                            <span className="text-gray-300 font-medium">
                              {entry.user.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <span className="ml-4 text-sm font-medium text-gray-100">
                            {entry.user.name || 'Anonymous'}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-amber-400 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          {entry.user.email || 'No email'}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <span className="inline-flex items-center bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm font-bold border border-amber-500/30">
                          {entry.score}
                          <span className="ml-1 text-amber-400 font-normal">pts</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;