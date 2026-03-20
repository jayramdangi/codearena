import React from 'react';
import ProblemItem from '../components/ProblemItem';

const ProblemList = ({ problems, currentPlayerSolved, opponentSolved, battleStatus, onSolveProblem }) => {
  console.log('Problems in ProblemList:', problems);
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm p-6 border-l-4 border-amber-500">
      <h3 className="text-2xl font-bold text-amber-300 mb-6">Battle Problems</h3>
      <div className="grid gap-4">
        {problems.map((problem, index) => {
          const isSolved = currentPlayerSolved.some(solved => solved.problemId === problem._id);
          const opponentSolvedThis = opponentSolved.some(solved => solved.problemId === problem._id);
          
          return (
            <ProblemItem
              key={problem._id}
              problem={problem}
              index={index}
              isSolved={isSolved}
              opponentSolvedThis={opponentSolvedThis}
              battleStatus={battleStatus}
              onSolveProblem={onSolveProblem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProblemList;