import { useState, useEffect } from 'react';
import axiosClient from '../../../services/api/axiosClient.js';

export const useContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/contest/getAllContest');
      setContests(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contests');
      console.error('Error fetching contests:', err);
    } finally {
      setLoading(false);
    }
  };

  const createContest = async (contestData) => {
    try {
      setLoading(true);
      const response = await axiosClient.post('/contest/create', contestData);
      await fetchContests(); // Refresh the list
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create contest');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContest = async (contestId) => {
    try {
      setLoading(true);
      await axiosClient.delete(`/contest/delete/${contestId}`);
      await fetchContests(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete contest');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContest = async (contestId, contestData) => {
    try {
      setLoading(true);
      const response = await axiosClient.put(`/contest/update/${contestId}`, contestData);
      await fetchContests(); // Refresh the list
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update contest');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  return {
    contests,
    loading,
    error,
    fetchContests,
    createContest,
    deleteContest,
    updateContest
  };
};