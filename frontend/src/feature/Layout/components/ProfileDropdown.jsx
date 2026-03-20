import React from 'react';
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/authSlice';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const ProfileDropdown = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    document.activeElement?.blur();
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        className="btn btn-ghost flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(245,241,231,0.8)]"
      >
        <FaUserCircle className="text-2xl text-creamGlow border-2 border-transparent rounded-full hover:border-creamGlow transition-all duration-300" />
        <span className="hidden md:inline text-creamGlow">{user?.firstName}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-lg bg-gray-800 rounded-lg w-64 z-50"
      >
        <li>
          <NavLink
            to="/profile"
            className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
            onClick={() => document.activeElement.blur()}
          >
            <div className="w-8 h-8 bg-purple-800 rounded-lg flex items-center justify-center mr-3">
              <FaUser className="text-purple-400 text-sm" />
            </div>
            <div className="text-left">
              <div className="font-medium text-creamGlow">Profile</div>
              <div className="text-xs text-gray-300">View and edit your profile</div>
            </div>
          </NavLink>
        </li>
        {user?.role === 'admin' && (
          <li>
            <NavLink
              to="/admin"
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
              onClick={() => document.activeElement.blur()}
            >
              <div className="w-8 h-8 bg-yellow-800 rounded-lg flex items-center justify-center mr-3">
                <FaCog className="text-yellow-400 text-sm" />
              </div>
              <div className="text-left">
                <div className="font-medium text-creamGlow">Admin</div>
                <div className="text-xs text-gray-300">Admin dashboard</div>
              </div>
            </NavLink>
          </li>
        )}
        <li>
          <button
            className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-all duration-200 w-full text-left"
            onClick={handleLogout}
          >
            <div className="w-8 h-8 bg-red-800 rounded-lg flex items-center justify-center mr-3">
              <FaSignOutAlt className="text-red-400 text-sm" />
            </div>
            <div className="text-left">
              <div className="font-medium text-creamGlow">Logout</div>
              <div className="text-xs text-gray-300">Sign out of your account</div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;