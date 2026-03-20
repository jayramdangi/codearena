import { useEffect, useState, useMemo } from 'react';
import axiosClient from '../../../services/api/axiosClient';
import { addMinutes, parseISO } from 'date-fns';

export const useContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get("/contest/getAllContest");
        setContests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contests:', error);
        setLoading(false);
      }
    };
    
    fetchContests();
  }, []);

  // Filter and sort contests
  const filteredContests = useMemo(() => {
    const now = new Date();
    let filtered = contests;

    // Apply status filter
    if (filter !== 'all') {
      filtered = contests.filter(contest => {
        const startTime = new Date(contest.startTime);
        const endTime = addMinutes(startTime, contest.duration);
        
        if (filter === 'upcoming') return startTime > now;
        if (filter === 'past') return endTime < now;
        return true;
      });
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(contest => 
        contest.title.toLowerCase().includes(term) ||
        contest.description?.toLowerCase().includes(term)
      );
    }

    // Sort contests
    return [...filtered].sort((a, b) => {
      const aStart = new Date(a.startTime);
      const bStart = new Date(b.startTime);

      if (filter === 'upcoming') return aStart - bStart;   // soonest first
      if (filter === 'past') return bStart - aStart;       // most recent first
      return bStart - aStart;                              // latest first for 'all'
    });
  }, [contests, filter, searchTerm]);

  return {
    contests,
    filteredContests,
    loading,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm
  };
};