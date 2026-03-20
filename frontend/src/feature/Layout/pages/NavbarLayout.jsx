import React from 'react';
import { Outlet } from "react-router";
import Navbar from '../components/Navbar';

const NavbarLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default NavbarLayout;