import React from 'react';


const SideBar = () => {
  return (
    <div className="h-screen w-16 flex flex-col items-center bg-gray-800 text-white">
      <div className="my-4">
        <i className="fab fa-facebook-f text-2xl mb-4 hover:text-blue-500">Video</i>
      </div>
      <div className="my-4">
        <i className="fab fa-twitter text-2xl mb-4 hover:text-blue-400">MarketPlace </i>
      </div>
      <div className="my-4">
        <i className="fab fa-instagram text-2xl mb-4 hover:text-pink-500">Setting</i>
      </div>
      <div className="my-4">
        <i className="fab fa-linkedin-in text-2xl mb-4 hover:text-blue-700">Saved</i>
      </div>
      <div className="my-4">
        <i className="fab fa-github text-2xl mb-4 hover:text-gray-600">memories</i>
      </div>
    </div>
  );
};

export default SideBar;
