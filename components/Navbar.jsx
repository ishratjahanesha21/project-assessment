"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, ChevronDown, ChevronUp } from "lucide-react";  // Import Lucide's icons
const Navbar = () => {
  const router = useRouter();
  const [cartQuantity, setCartQuantity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null);
  // Update cart quantity from localStorage
  const updateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartQuantity(totalQuantity);
  };

  // Update user information on login
  const handleUserLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);  
  };

  useEffect(() => {
    // Update cart quantity and user info on component mount
    updateCartQuantity();
    window.addEventListener("cartUpdate", updateCartQuantity);
    window.addEventListener("userLogin", handleUserLogin);
    handleUserLogin();
    return () => {
      window.removeEventListener("cartUpdate", updateCartQuantity);
      window.removeEventListener("userLogin", handleUserLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false); 
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <nav className="fixed z-50 w-full bg-white md:absolute md:bg-transparent">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <input
            type="checkbox"
            name="toggle_nav"
            id="toggle_nav"
            className="peer hidden"
          />
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
            <Link
              href="/"
              aria-label="logo"
              className="flex space-x-2 items-center"
            >
              <span className="text-2xl font-bold text-yellow-900">
                Tailus <span className="text-yellow-700">Feedus</span>
              </span>
            </Link>

            <div className="flex items-center lg:hidden max-h-10">
              <label
                role="button"
                htmlFor="toggle_nav"
                aria-label="hamburger"
                id="hamburger"
                className="relative w-10 h-auto p-2"
              >
                <div
                  id="line"
                  className="m-auto h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                ></div>
                <div
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                ></div>
              </label>
            </div>
          </div>

          <label
            role="button"
            htmlFor="toggle_nav"
            className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200 bg-opacity-30 backdrop-blur backdrop-filter"
          ></label>
          <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
            <div className="text-gray-600 lg:pr-4 w-full">
              <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                <li>
                  <Link
                    href="/all-recipes"
                    className="block md:px-4 transition hover:text-yellow-700"
                  >
                    <span>All recipes</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="relative">
                    <span className="text-yellow-700 font-semibold">Cart</span>
                    {cartQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full animate-bounce">
                        {cartQuantity}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center  text-yellow-700 font-semibold"
                  >
                    <User size={40} className="text-yellow-700 border rounded-full ml-4 p-2" />  
                    <span>{user.name}</span>
                    {dropdownOpen ? (
                      <ChevronUp size={20} className="text-yellow-700" />  
                    ) : (
                      <ChevronDown size={20} className="text-yellow-700" />  
                    )}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 p-2 w-48 bg-white shadow-lg rounded-lg">
                      <div className="text-gray-800">Hey, {user.name}</div>
                      <Link href="/user-cart">
                        <div className="py-2 px-4 text-sm text-yellow-700 hover:bg-yellow-100 rounded">
                          Dashboard
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="py-2 px-4 text-sm text-red-600 hover:bg-red-100 w-full text-left rounded"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/signup">
                    <button
                      type="button"
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Signup
                      </span>
                    </button>
                  </Link>
                  <Link href="/login">
                    <button
                      type="button"
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Login
                      </span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
