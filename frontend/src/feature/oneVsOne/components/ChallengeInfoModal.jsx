import React from 'react';
import { FaSearch, FaUserFriends, FaPlay, FaTrophy, FaClock, FaUsers, FaTimes } from 'react-icons/fa';

const ChallengeInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <FaSearch className="text-amber-400" />,
      title: "Search for Friends",
      description: "Find your friends or other coders to challenge using our search feature"
    },
    {
      icon: <FaUserFriends className="text-amber-400" />,
      title: "Send Challenge Request",
      description: "Send a real-time coding challenge with your preferred duration"
    },
    {
      icon: <FaPlay className="text-amber-400" />,
      title: "Accept & Battle",
      description: "Once accepted, the real-time coding battle begins immediately"
    }
  ];

  const features = [
    {
      icon: <FaClock className="text-amber-400" />,
      title: "Real-time Battles",
      description: "Code simultaneously against your opponent with live progress tracking"
    },
    {
      icon: <FaTrophy className="text-amber-400" />,
      title: "Competitive Scoring",
      description: "Win based on code efficiency, correctness, and completion time"
    },
    {
      icon: <FaUsers className="text-amber-400" />,
      title: "Friend Challenges",
      description: "Challenge friends directly or find opponents in our community"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto border-l-4 border-amber-500">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-3xl font-bold text-amber-300">
            How to Challenge a Friend
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-400">
              Challenge your friends to exciting real-time coding battles and see who comes out on top!
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-amber-300 mb-8 text-center">
              Simple 3-Step Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-800 rounded-full p-4">
                      {step.icon}
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="bg-amber-500 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-100 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-amber-300 mb-6 text-center">
              Battle Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-100 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-amber-300 mb-4 text-center">
              Pro Tips for Success
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="bg-amber-400 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-400">Choose opponents with similar skill levels for balanced matches</p>
              </div>
              <div className="flex items-start">
                <span className="bg-amber-400 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-400">Practice common algorithms and data structures beforehand</p>
              </div>
              <div className="flex items-start">
                <span className="bg-amber-400 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-400">Stay connected - disconnections may result in automatic loss</p>
              </div>
              <div className="flex items-start">
                <span className="bg-amber-400 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-400">Read problems carefully and plan your approach before coding</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-800">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Start Challenging Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeInfoModal;