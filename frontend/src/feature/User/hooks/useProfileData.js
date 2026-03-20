import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../../services/api/axiosClient';

const useProfileData = () => {
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const problemsResponse = await axiosClient.get('/problem/getAllProblem');
        setProblems(problemsResponse.data);

        if (user) {
          const solvedResponse = await axiosClient.get('/problem/problemSolvedByUser');
          setSolvedProblems(solvedResponse.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const calculateStats = () => {
    const stats = {
      easy: { total: 0, solved: 0 },
      medium: { total: 0, solved: 0 },
      hard: { total: 0, solved: 0 },
    };

    problems.forEach((problem) => {
      const diff = problem.difficulty;
      if (stats[diff]) {
        stats[diff].total += 1;
      }
    });

    solvedProblems.forEach((problem) => {
      const diff = problem.difficulty;
      if (stats[diff]) {
        stats[diff].solved += 1;
      }
    });

    const totalProblems = problems.length;
    const totalSolved = solvedProblems.length;
    const solvedPercentage = totalProblems > 0
      ? Math.round((totalSolved / totalProblems) * 100)
      : 0;

    return { ...stats, totalProblems, totalSolved, solvedPercentage };
  };

  const stats = calculateStats();

  return {
    user,
    problems,
    solvedProblems,
    loading,
    error,
    stats
  };
};

export default useProfileData;