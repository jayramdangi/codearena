import { useState, useMemo } from 'react';

export const useProblemsFilter = (problems, solvedProblems, user) => {
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTags, setExpandedTags] = useState(false);

  const problemTags = [
    'array', 'linkedList', 'string', 'tree', 'graph',
    'dp', 'math', 'sorting', 'greedy', 'binarySearch',
    'stack', 'queue', 'hashing', 'recursion', 'bitManipulation',
    'slidingWindow', 'twoPointers', 'backtracking', 'heap',
    'trie', 'segmentTree', 'unionFind', 'topologicalSort',
    'numberTheory', 'combinatorics', 'prefixSum', 'gameTheory',
    'matrix', 'monotonicStack', 'intervals', 'priorityQueue',
    'bfs', 'dfs', 'lca', 'fenwickTree', 'kmp', 'zAlgorithm',
    'rabinKarp', 'rollingHash', 'moAlgorithm', 'lineSweep',
    'meetInMiddle', 'cycleDetection', 'bellmanFord', 'dijkstra',
    'floydWarshall', 'bridgeArticulation', 'eulerTour', 'binaryLifting',
    'bitmasking', 'digitDP', 'convexHull', 'persistentDS',
    'dsuOnTree', 'scc', 'stronglyConnectedComponents', 'ahoCorasick'
  ];

  const visibleTags = useMemo(() => {
    return expandedTags ? problemTags : problemTags.slice(0, 12);
  }, [expandedTags]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const difficultyMatch = filters.difficulty === 'all' || 
        problem.difficulty.toLowerCase() === filters.difficulty;
      const tagMatch = filters.tag === 'all' || 
        problem.tags?.toLowerCase().includes(filters.tag.toLowerCase());
      const statusMatch = filters.status === 'all' || 
        (filters.status === 'solved' 
          ? solvedProblems.some(sp => sp._id === problem._id)
          : !solvedProblems.some(sp => sp._id === problem._id));
      const searchMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      return difficultyMatch && tagMatch && statusMatch && searchMatch;
    });
  }, [problems, solvedProblems, filters, searchTerm]);

  const handleClearFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: 'all'
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      difficulty: 'all',
      tag: 'all',
      status: 'all'
    });
    setSearchTerm('');
  };

  return {
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    expandedTags,
    setExpandedTags,
    problemTags,
    visibleTags,
    filteredProblems,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters
  };
};