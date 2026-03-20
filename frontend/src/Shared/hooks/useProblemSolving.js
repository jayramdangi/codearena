import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../services/api/axiosClient';
import { LANG_MAP } from '../utils/constants';

export const useProblemSolving = (problemId, initialLanguage = 'javascript') => {
  const { user } = useSelector((state) => state.auth);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProblem = async () => {
      if (!problemId) return;
      
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        if (isMounted.current) {
          const initialCode = response.data.startCode?.find(sc => 
            sc.language === LANG_MAP[selectedLanguage]
          )?.initialCode || '';
          
          setProblem(response.data);
          setCode(initialCode);
          setEditorValue('\n' + initialCode);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching problem:', err);
        if (isMounted.current) {
          setError('Failed to load problem. Please try again.');
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode?.find(sc => 
        sc.language === LANG_MAP[selectedLanguage]
      )?.initialCode || '';
      setCode(initialCode);
      setEditorValue('\n' + initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleCodeChange = (value) => {
    const val = value || '';
    setEditorValue(val);
    const raw = val.startsWith('\n') ? val.slice(1) : val;
    setCode(raw);
  };

  const getDifficultyInfo = (difficulty) => {
    const difficultyLower = difficulty?.toLowerCase() || 'medium';
    return {
      textColor: difficultyLower === 'easy' ? 'text-green-400' : 
                 difficultyLower === 'medium' ? 'text-yellow-400' : 'text-red-400',
      bgColor: difficultyLower === 'easy' ? 'bg-green-800 text-green-200' : 
               difficultyLower === 'medium' ? 'bg-yellow-800 text-yellow-200' : 'bg-red-800 text-red-200',
      displayName: difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1) || 'Medium'
    };
  };

  return {
    problem,
    loading,
    error,
    selectedLanguage,
    code,
    editorValue,
    user,
    setSelectedLanguage: handleLanguageChange,
    setCode: handleCodeChange,
    setEditorValue,
    getDifficultyInfo,
    refreshProblem: () => {
      setLoading(true);
      setProblem(null);
    }
  };
};