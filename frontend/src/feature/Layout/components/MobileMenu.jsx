import React from 'react';
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/authSlice';
import { FaHome, FaCode, FaTrophy, FaUserFriends, FaUser, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const MobileMenu = ({ user, isOneVsOneActive, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
  };

  return (
    <div className="md:hidden border-t border-gray-700 pt-4 pb-4 bg-gray-900">
      <div className="flex flex-col space-y-3">
        <NavLink
          to="/"
          className="flex items-center px-3 py-2 rounded-lg text-[18px] font-medium text-creamGlow hover:text-orange-400 transition-all duration-300"
          onClick={onClose}
        >
          <FaHome className="mr-3" />
          Home
        </NavLink>

        <NavLink
          to="/problems"
          className="flex items-center px-3 py-2 rounded-lg text-[18px] font-medium text-creamGlow hover:text-orange-400 transition-all duration-300"
          onClick={onClose}
        >
          <FaCode className="mr-3" />
          Problems
        </NavLink>

        <NavLink
          to="/contest"
          className="flex items-center px-3 py-2 rounded-lg text-[18px] font-medium text-creamGlow hover:text-orange-400 transition-all duration-300"
          onClick={onClose}
        >
          <FaTrophy className="mr-3" />
          Contests
        </NavLink>

        <div className="border-t border-gray-700 pt-3">
          <div className="px-3 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
            1vs1 Battles
          </div>
          <NavLink
            to="/onevsone"
            className="flex items-center px-3 py-2 rounded-lg text-[18px] font-medium text-creamGlow hover:text-orange-400"
            onClick={onClose}
          >
            <div className="w-6 h-6 bg-green-800 rounded flex items-center justify-center mr-3">
              <FaUserFriends className="text-green-400 text-xs" />
            </div>
            Friend Challenge
          </NavLink>
        </div>

        {user && (
          <div className="border-t border-gray-700 pt-3">
            <div className="px-3 py-2 flex items-center">
              <FaUserCircle className="text-2xl text-creamGlow mr-3" />
              <div>
                <div className="text-sm font-medium text-creamGlow">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-gray-300">Rating: {user.rating || 0}</div>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <NavLink
                to="/profile"
                className="flex items-center px-3 py-2 rounded-lg text-[16px] text-creamGlow hover:text-orange-400"
                onClick={onClose}
              >
                <FaUser className="mr-3" />
                Profile
              </NavLink>
              {user?.role === 'admin' && (
                <NavLink
                  to="/admin"
                  className="flex items-center px-3 py-2 rounded-lg text-[16px] text-creamGlow hover:text-orange-400"
                  onClick={onClose}
                >
                  <FaCog className="mr-3" />
                  Admin
                </NavLink>
              )}
              <button
                className="flex items-center px-3 py-2 rounded-lg text-[16px] text-creamGlow hover:text-orange-400 w-full text-left"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;