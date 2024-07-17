import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaBell, FaCaretDown, FaStore, FaUsers, FaGamepad } from 'react-icons/fa';

const Header = () => {
  return (
    <nav className="bg-blue-800 text-white flex items-center p-4 shadow-md">
      <div className="flex items-center">
        <Link to="/" className="text-white text-2xl mr-4">
          social-media
        </Link>
        <div className="relative flex">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-full bg-blue-700 text-white focus:outline-none"
          />
          <FaSearch className="absolute top-2 right-3 text-white" />
        </div>
      </div>
      <div className="flex flex-grow justify-center space-x-12 items-center">
        <Link to="/" exact className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaHome />
        </Link>
        <Link to="/marketplace" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaStore />
        </Link>
        <Link to="/Groups" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaUsers />
        </Link>
        <Link to="/Gaming" className="text-white text-2xl hover:text-white hover:scale-125 transition-transform duration-200">
          <FaGamepad />
        </Link>
      </div>
      <div className="flex space-x-6 items-center">
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

export default Header;
