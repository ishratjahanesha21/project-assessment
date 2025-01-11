import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="flex justify-end">
        <div className="w-16 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
      <div className="w-2/3 h-6 bg-gray-300 rounded mt-4"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded mt-2"></div>
      <div className="w-1/3 h-4 bg-gray-300 rounded mt-2"></div>
    </div>
  );
};
const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });
  if (error) return <div>Error loading recipe: {error.message}</div>;
  if (!isLoading && data) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
        <div>
          <Image
            src={data?.strMealThumb}
            width={500}
            height={500}
            alt={data?.strMeal}
          />
        </div>
        <h2 className="text-2xl font-semibold">{data?.strMeal}</h2>
        <p>{data?.strInstructions}</p>
        <p>{data?.strCategory}</p>
      </div>
    );
  }
  return <SkeletonLoader />;
};
export default SingleRecipe;
