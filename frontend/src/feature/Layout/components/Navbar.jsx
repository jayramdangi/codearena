import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import DesktopNavLinks from './DesktopNavLinks';
import MobileMenu from './MobileMenu';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isOneVsOneActive =
    location.pathname.includes('/onevsone') ||
    location.pathname.includes('/battle/');

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl z-50 fixed top-0 left-0 w-full border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="font-bold text-3xl text-creamGlow transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(245,241,231,0.8)] cursor-pointer">
                &lt;/&gt; PeerCode
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex flex-grow justify-center">
              <DesktopNavLinks 
                isOneVsOneActive={isOneVsOneActive} 
                currentPath={location.pathname} 
              />
            </div>

            {/* Right Section - Profile & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Rating Display */}
              {(location.pathname.includes('/battle/') || location.pathname === '/quick-match') &&
                user?.rating && (
                  <div className="hidden sm:flex items-center px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full border border-gray-600">
                    <span className="text-xs text-creamGlow font-medium">Rating: {user.rating}</span>
                  </div>
                )}

              {/* Profile Dropdown */}
              <ProfileDropdown user={user} />

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-creamGlow hover:text-orange-400 transition duration-200"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <MobileMenu 
              user={user} 
              isOneVsOneActive={isOneVsOneActive}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}
        </div>
      </nav>
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;