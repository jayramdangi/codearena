import React from "react";
import {
  FaInfoCircle,
  FaListUl,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
    <div className="flex items-center mb-3">
      <Icon className="text-amber-400 mr-3" />
      <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
    </div>
    <div className="text-gray-400 text-sm space-y-2">
      {children}
    </div>
  </div>
);

const ContestInstructions = ({ contest, problemsCount }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-gray-900 shadow">
        <h2 className="text-2xl font-bold mb-2">
          Contest Instructions
        </h2>
        <p className="text-sm opacity-90">
          Read the following instructions carefully before starting the contest.
        </p>
      </div>

      {/* Overview */}
      <InfoCard icon={FaInfoCircle} title="Contest Overview">
        <p>
          This contest consists of <b>{problemsCount}</b> coding problem
          {problemsCount !== 1 && "s"}.
        </p>
        <p>
          Once the contest starts, you can submit solutions until the contest
          ends.
        </p>
      </InfoCard>

      {/* Problem Info */}
      <InfoCard icon={FaListUl} title="Problems">
        <ul className="list-disc pl-5 space-y-1">
          <li>Total problems: <b>{problemsCount}</b></li>
          <li>Problems are unlocked when the contest is live</li>
          <li>You may solve problems in any order</li>
        </ul>
      </InfoCard>

      {/* Time & Submissions */}
      <InfoCard icon={FaClock} title="Time & Submissions">
        <ul className="list-disc pl-5 space-y-1">
          <li>Contest duration: <b>{contest.duration} minutes</b></li>
          <li>Unlimited submissions allowed</li>
          <li>Penalty of <b>5 minutes</b> for each wrong submission</li>
        </ul>
      </InfoCard>

      {/* Violations */}
      <InfoCard icon={FaExclamationTriangle} title="Rules & Violations">
        <ul className="list-disc pl-5 space-y-1">
          <li>Multiple accounts are not allowed</li>
          <li>Copying or sharing code is strictly prohibited</li>
          <li>Use of external help or AI tools is forbidden</li>
          <li>Violation may lead to disqualification</li>
        </ul>
      </InfoCard>
    </div>
  );
};

export default ContestInstructions;
