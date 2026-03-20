import { useState } from 'react';
import axiosClient from '../../services/api/axiosClient';

export const useCodeExecution = (problemId, mode = 'problem') => {
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRun = async (code, language) => {
    setIsExecuting(true);
    setRunResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language
      });
      setRunResult(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error',
        testCases: []
      });
      return { success: false, error: 'Failed to run code' };
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async (code, language, contestId, battleId) => {
    setIsExecuting(true);
    setSubmitResult(null);
    
    try {
      let endpoint = `/submission/submit/${problemId}`;
      
      if (mode === 'contest' && contestId) {
        endpoint = `/contest/submit/${contestId}/${problemId}`;
      } else if (mode === 'onevsone' && battleId) {
        endpoint = `/onevsone/submit/${battleId}/${problemId}`;
      }

      const response = await axiosClient.post(endpoint, {
        code,
        language
      });
      
      setSubmitResult(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      return { success: false, error: 'Failed to submit code' };
    } finally {
      setIsExecuting(false);
    }
  };

  const clearResults = () => {
    setRunResult(null);
    setSubmitResult(null);
  };

  return {
    runResult,
    submitResult,
    isExecuting,
    handleRun,
    handleSubmit,
    clearResults
  };
};