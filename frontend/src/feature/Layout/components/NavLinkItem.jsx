import React from 'react';
import { NavLink } from 'react-router';

const NavLinkItem = ({ to, icon, label, active }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg text-[20px] font-medium transition-all duration-300 ${
          isActive || active ? 'text-orange-400' : 'text-creamGlow hover:text-orange-400'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

export default NavLinkItem;