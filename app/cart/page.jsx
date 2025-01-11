"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    setIsLoading(false);
  }, []);

  const updateQuantity = (idMeal, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item =>
      item.idMeal === idMeal ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const removeItem = (idMeal) => {
    const updatedItems = cartItems.filter(item => item.idMeal !== idMeal);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (10 * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you have not added any meals to your cart yet.</p>
          <Link 
            href="/all-recipes"
            className="inline-block bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div 
                  key={item.idMeal}
                  className="flex flex-col sm:flex-row items-center gap-4 p-6 border-b border-gray-100"
                >
                  <Image
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.strMeal}
                    </h3>
                    <p className="text-gray-600 mb-4">$10</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.idMeal, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.idMeal, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.idMeal)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${(10 * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-yellow-400 text-yellow-900 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <Link 
                href="/all-recipes"
                className="block text-center mt-4 text-gray-600 hover:text-gray-800"
              >
                Continue 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;