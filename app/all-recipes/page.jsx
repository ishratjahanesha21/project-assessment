"use client";
import HttpKit from "@/common/helpers/HttpKit";
import AllRecipeCard from "@/components/Recipes/AllRecipeCard";
import SkeletonCard from "@/components/Recipes/SkeletonCard";
import React, { useEffect, useState } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const data = await HttpKit.getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching all recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) {
        endPage = 4;
      }
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-32">
      <h2 className="text-2xl font-bold mb-6">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : currentRecipes.map((recipe) => (
              <AllRecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
      </div>

      {/* Enhanced Pagination Controls */}
      <div className="mt-8 flex justify-center items-center">
        <nav className="flex items-center gap-1 rounded-lg bg-white p-2 shadow-lg">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className=" h-10 w-16 rounded-lg flex items-center justify-center text-gray-600 hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
           Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                disabled={pageNum === '...'}
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  pageNum === currentPage
                    ? 'bg-yellow-400 text-white font-medium'
                    : pageNum === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-600 hover:bg-yellow-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-10 w-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      </div>

      {/* Showing results text */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Showing {startIndex + 1}-{Math.min(endIndex, recipes.length)} of {recipes.length} recipes
      </div>
    </div>
  );
};

export default AllRecipes;