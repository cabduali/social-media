import React from "react";

const Card = ({ name, img, status }) => {
  const statusColor = status === "Offline" ? "text-red-600" : "text-green-600";

  return (
    <div className="relative w-56 m-4">
      <img
        className="h-80 w-full rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg"
        src={img}
        alt={name}
      />
      <div className="absolute bottom-4 left-4">
        <p className="text-sm font-medium text-white font-roboto leading-none">
          {name}
        </p>
      </div>
      <div className="absolute bottom-4 right-4">
        <p className={`text-sm font-medium ${statusColor} font-roboto leading-none`}>
          {status}
        </p>
      </div>
    </div>
  );
};

export default Card;
