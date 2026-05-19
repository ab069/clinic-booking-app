import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { FaHeartPulse } from 'react-icons/fa6';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
            <FaHeartPulse className="text-red-500" />
            MediCare
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/doctors" className="hover:text-primary transition">
              Doctors
            </Link>
            <Link to="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {user?.role === 'patient' && (
                  <Link
                    to="/patient/dashboard"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {user?.role === 'doctor' && (
                  <Link
                    to="/doctor/dashboard"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link to="/doctors" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Doctors
            </Link>
            <Link to="/about" className="block px-4 py-2 hover:bg-gray-100 rounded">
              About
            </Link>
            <Link to="/contact" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === 'patient' && (
                  <Link
                    to="/patient/dashboard"
                    className="block px-4 py-2 bg-primary text-white rounded"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 px-4">
                <Link to="/login" className="flex-1 px-4 py-2 border border-primary text-primary rounded text-center">
                  Login
                </Link>
                <Link to="/register" className="flex-1 px-4 py-2 bg-primary text-white rounded text-center">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
