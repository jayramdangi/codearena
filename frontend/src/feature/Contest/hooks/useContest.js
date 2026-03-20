import { useEffect, useState } from 'react';
import axiosClient from '../../../services/api/axiosClient';

export const useContest = (id) => {
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        setLoading(true);
        const response = await axiosClient(`/contest/getContest/${id}`);
        
        // Extract data from updated backend response
        const { contestInfo, problems, leaderboard } = response.data;
        
        setContest(contestInfo);
        setProblems(problems || []);
        setLeaderboard(leaderboard || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load contest data. Please try again later.');
        setLoading(false);
        console.error('Error fetching contest problems:', err);
      }
    };
    
    if (id) {
      fetchContestData();
    }
  }, [id]);

  return {
    contest,
    problems,
    leaderboard,
    loading,
    error
  };
};