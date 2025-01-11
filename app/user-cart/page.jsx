"use client"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../common/firebaseConfig";
import { Trash2 } from "lucide-react";
import Image from "next/image";

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;
      if (!user) {
        setCartItems([]);
        setIsLoading(false);
        return;
      }

      try {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().items || []);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-xl text-gray-600">Your cart is empty.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div 
              key={item.idMeal} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex items-center p-4">
                <Image
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-lg">{item.strMeal}</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCart;