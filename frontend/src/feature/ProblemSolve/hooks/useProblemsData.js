import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../../services/api/axiosClient';

const useProblemsData = () => {
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsRes, solvedRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
        ]);

        setProblems(problemsRes.data);
        setSolvedProblems(solvedRes.data || []);
      } catch (err) {
        console.error('Error fetching problems:', err);
        setError('Failed to load problems');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return {
    problems,
    solvedProblems,
    loading,
    error,
    user
  };
};

export default useProblemsData;