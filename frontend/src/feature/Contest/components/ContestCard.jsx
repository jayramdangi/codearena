import React, { useMemo } from 'react';
import { NavLink } from 'react-router';
import { format, parseISO, addMinutes } from 'date-fns';
import { useTimer } from '../hooks/useTimer';
import {
  FaTrophy,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaQuestionCircle,
  FaArrowRight
} from 'react-icons/fa';

const ContestCard = ({ contest }) => {
  // ✅ Memoized dates (CRITICAL FIX)
  const startDate = useMemo(
    () => parseISO(contest.startTime),
    [contest.startTime]
  );

  const endDate = useMemo(
    () => addMinutes(startDate, contest.duration),
    [startDate, contest.duration]
  );

  const { timeLeft, status } = useTimer(startDate, endDate);

  // Status badge style
  const getStatusStyle = () => {
    switch (status) {
      case 'upcoming':
        return "bg-amber-800 text-amber-100";
      case 'live':
        return "bg-green-800 text-green-200 animate-pulse";
      case 'completed':
        return "bg-blue-800 text-blue-200";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  // Status text
  const getStatusText = () => {
    switch (status) {
      case 'upcoming':
        return "Starts in";
      case 'live':
        return "Ends in";
      case 'completed':
        return "Contest Ended";
      default:
        return "";
    }
  };

  return (
    <NavLink to={`/contest/${contest._id}`} className="group">
      <div className="bg-gray-900 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md h-full flex flex-col border-l-4 border-amber-500">

        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>

          <div className="relative z-10 text-white text-center">
            <div className="flex justify-center mb-2">
              <FaTrophy className="h-12 w-12 text-amber-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {contest.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-grow">

          {/* Timer */}
          <div className="mb-4">
            <div
              className={`flex justify-between items-center px-4 py-3 rounded-lg ${getStatusStyle()}`}
            >
              <span className="font-medium text-sm">
                {getStatusText()}
              </span>

              {status !== 'completed' ? (
                <div className="flex space-x-1">
                  {timeLeft?.days > 0 && (
                    <>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">
                          {timeLeft?.days.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs">DAYS</span>
                      </div>
                      <span className="font-bold">:</span>
                    </>
                  )}

                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg">
                      {timeLeft?.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs">HRS</span>
                  </div>

                  <span className="font-bold">:</span>

                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg">
                      {timeLeft?.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs">MIN</span>
                  </div>

                  <span className="font-bold">:</span>

                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg">
                      {timeLeft?.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs">SEC</span>
                  </div>
                </div>
              ) : (
                <span className="font-medium">Completed</span>
              )}
            </div>
          </div>

          {/* Contest Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <FaCalendarAlt className="h-4 w-4 text-amber-400 mr-3" />
              <span className="text-sm text-gray-400">
                {format(startDate, "MMM d, yyyy h:mm a")}
              </span>
            </div>

            <div className="flex items-center">
              <FaClock className="h-4 w-4 text-amber-400 mr-3" />
              <span className="text-sm text-gray-400">
                {contest.duration} minutes
              </span>
            </div>

            <div className="flex items-center">
              <FaUsers className="h-4 w-4 text-amber-400 mr-3" />
              <span className="text-sm text-gray-400">
                Open to all participants
              </span>
            </div>

            <div className="flex items-center">
              <FaQuestionCircle className="h-4 w-4 text-amber-400 mr-3" />
              <span className="text-sm text-gray-400">
                {contest.contestProblems?.length || 0} problems
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {status === 'completed'
                ? `Ended ${format(endDate, "MMM d")}`
                : `Starts ${format(startDate, "MMM d")}`}
            </span>
            <button className="text-amber-400 font-medium group-hover:text-amber-300 transition-colors flex items-center">
              View Contest
              <FaArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </NavLink>
  );
};

export default ContestCard;
