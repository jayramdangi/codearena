import React from 'react';
import { useTimer } from '../hooks/useTimer';
import { parseISO, addMinutes } from 'date-fns';

const Timer = ({ startDate, endDate }) => {
     
    if(!(startDate instanceof Date) || !(endDate instanceof Date)) return null; 
  const { timeLeft, status } = useTimer(startDate, endDate);

  // Get status badge style
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming':
        return "bg-amber-800 text-amber-100";
      case 'live':
        return "bg-green-800 text-green-200 animate-pulse";
      case 'completed':
        return "bg-gray-800 text-gray-200";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  // Get status text
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
    <div className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor()} flex items-center`}>
      <span className="mr-2">{getStatusText()}</span>
      {status !== 'completed' && (
        <div className="flex space-x-1">
          {timeLeft?.days > 0 && (
            <>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-bold">{timeLeft?.days.toString().padStart(2, '0')}</span>
                <span className="text-[10px]">DAYS</span>
              </div>
              <span className="font-bold">:</span>
            </>
          )}
          <div className="flex flex-col items-center min-w-[40px]">
            <span className="font-bold">{timeLeft?.hours.toString().padStart(2, '0')}</span>
            <span className="text-[10px]">HRS</span>
          </div>
          <span className="font-bold">:</span>
          <div className="flex flex-col items-center min-w-[40px]">
            <span className="font-bold">{timeLeft?.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[10px]">MIN</span>
          </div>
          <span className="font-bold">:</span>
          <div className="flex flex-col items-center min-w-[40px]">
            <span className="font-bold">{timeLeft?.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[10px]">SEC</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;