import React from 'react';
import { NavLink } from 'react-router';
import { FaHome, FaCode, FaTrophy, FaUserFriends } from 'react-icons/fa';
import NavLinkItem from './NavLinkItem';
import { useSelector } from 'react-redux';

const DesktopNavLinks = ({ isOneVsOneActive, currentPath }) => {
  const navLinks = [
    {
      to: '/',
      icon: <FaHome className="mr-2" />,
      label: 'Home',
      active: currentPath === '/'
    },
    {
      to: '/problems',
      icon: <FaCode className="mr-2" />,
      label: 'Problems',
      active: currentPath === '/problems'
    },
    {
      to: '/contest',
      icon: <FaTrophy className="mr-2" />,
      label: 'Contests',
      active: currentPath === '/contest'
    },
  ];

   const {
    challengesGiven,
    challengesIncoming,
    activeBattle
  } = useSelector((state) => state.onevsone);
  // let isThere = challengesGiven.length || challengesIncoming.length||activeBattle.length;
     
     let isThere = challengesGiven.length || challengesIncoming.length || activeBattle; 

     

  return (
    <div className="flex items-center space-x-2">
      {navLinks.map((link) => (
        <NavLinkItem key={link.to} {...link} />
      ))}
      
      {/* 1vs1 Dropdown */}
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          className={`flex items-center px-4 py-2 rounded-lg text-[20px] font-medium transition-all duration-300 cursor-pointer ${
            isOneVsOneActive ? 'text-orange-400' : isThere?'text-red-700': 'text-creamGlow hover:text-orange-400'
          }`}
        >
          <FaUserFriends className="mr-2" />
          1vs1
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-lg bg-gray-800 rounded-lg w-64 z-50"
        >
          <li>
            <NavLink
              to="/onevsone"
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
              onClick={() => document.activeElement.blur()}
            >
              <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center mr-3">
                <FaUserFriends className="text-green-400 text-sm" />
              </div>
              <div className="text-left">
                <div className="font-medium text-creamGlow">Friend Challenge</div>
                <div className="text-xs text-gray-300">Challenge your friends</div>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopNavLinks;