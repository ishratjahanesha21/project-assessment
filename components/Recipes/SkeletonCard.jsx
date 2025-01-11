import React from "react";

const SkeletonCard = () => {
  return (
    <div className="group space-y-6 border border-gray-100 rounded-3xl bg-white px-4 py-4 text-center shadow animate-pulse">
      <div className="mx-auto bg-gray-200 rounded-2xl w-full h-64"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
  );
};

export default SkeletonCard;
