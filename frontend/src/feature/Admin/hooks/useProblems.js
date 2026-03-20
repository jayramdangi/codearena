import { useEffect, useState } from 'react';
import axiosClient from '../../../services/api/axiosClient';

export const useProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProblem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;
    
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      await axiosClient.delete(`/video/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to delete video');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return {
    problems,
    loading,
    error,
    fetchProblems,
    deleteProblem,
    deleteVideo
  };
};