"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";
import SkeletonCard from "./SkeletonCard";
import { Search } from "lucide-react";
const RecipesList = () => {
    const [openDetails, setOpenDetails] = useState(false);
    const [recipeId, setRecipeId] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    
    const { data, isLoading, error } = useQuery({
      queryKey: ["recipes"],
      queryFn: HttpKit.getTopRecipes,
    });

    useEffect(() => {
      if (data) {
        setRecipes(data);
      }
    }, [data]);

    const handleSearch = (e) => {
      e.preventDefault();
      setSearchQuery(searchInput);
    };

    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchInput(value);
      if (value === "") {
        setSearchQuery("");
      }
    };

    const handleDetailsOpen = (id) => {
      setOpenDetails(true);
      setRecipeId(id);
    };

    const filteredRecipes = searchQuery
      ? recipes.filter((recipe) =>
          recipe?.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : recipes;

    if (error) return <div>Error loading recipes: {error.message}</div>;

    const NoResultsFound = () => (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
          <Search className="mx-auto h-24 w-24 text-yellow-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Recipes Found
          </h3>
          <p className="text-gray-600 mb-6">
          We could not find any recipes that match <span className="text-xl text-yellow-500 font-semibold">{searchQuery}</span>. 
            
          </p>
          <button
            onClick={() => {
              setSearchInput("");
              setSearchQuery("");
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
          >
            Show All Recipes
          </button>
        </div>
      </div>
    );

    return (
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Top Recipes</h1>
          {/* Search form */}
          <div>
            <form action="" className="w-full mt-12" onSubmit={handleSearch}>
              <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                <input
                  placeholder="Your favorite food"
                  className="w-full p-4 rounded-full outline-none bg-transparent"
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  title="Search"
                  className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
                >
                  <span className="hidden text-yellow-900 font-semibold md:block">
                    Search
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 mx-auto text-yellow-900 md:hidden"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="relative py-16">
            <div className="container relative m-auto px-6 text-gray-500 md:px-12">
              {isLoading ? (
                <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : filteredRecipes.length > 0 ? (
                <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe?.id}
                      recipe={recipe}
                      handleDetailsOpen={handleDetailsOpen}
                    />
                  ))}
                </div>
              ) : (
                <NoResultsFound />
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal isOpen={openDetails} setIsOpen={setOpenDetails} recipeId={recipeId}>
          <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
        </Modal>
      </div>
    );
};

export default RecipesList;