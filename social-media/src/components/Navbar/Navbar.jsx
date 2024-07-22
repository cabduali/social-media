import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaBell, FaCaretDown, FaStore, FaUsers, FaGamepad } from 'react-icons/fa';

import UserLinks from './UserLinks';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white flex items-center p-4 shadow-md justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-extrabold text-white font-roboto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
            Social Media
          </span>{" "}
          App
        </Link>
        <div className="relative ml-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-full bg-blue-700 text-white focus:outline-none"
          />
          <FaSearch className="absolute top-2 right-3 text-white" />
        </div>
      </div>
      <div className="flex flex-grow justify-center space-x-12 items-center">
        <Link to="/" exact="true" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaHome />
        </Link>
        <Link to="/marketplace" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaStore />
        </Link>
        <Link to="/groups" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaUsers />
        </Link>
        <Link to="/gaming" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaGamepad />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
    
        <Link to="/notifications" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaBell />
        </Link>
        <div className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaCaretDown />
        </div>
 
      </div>
    </nav>
  );
};

export default Navbar;
