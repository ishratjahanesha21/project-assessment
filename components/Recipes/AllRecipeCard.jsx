"use client";
import Image from "next/image";
import React, { useState } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../common/firebaseConfig"; // Adjust the path as necessary
import { message } from "antd"; 

const AllRecipeCard = ({ recipe }) => {
  const addToCart = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = auth.currentUser;
  
    try {
      // Update local storage cart
      const existingItem = cart.find((item) => item.idMeal === recipe.idMeal);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...recipe, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Update Firestore if user is logged in
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          const existingFirestoreCart = cartSnap.data().items || [];
          const existingFirestoreItem = existingFirestoreCart.find(
            (item) => item.idMeal === recipe.idMeal
          );
  
          if (existingFirestoreItem) {
            const updatedItems = existingFirestoreCart.map((item) =>
              item.idMeal === recipe.idMeal
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            await updateDoc(cartRef, { items: updatedItems });
          } else {
            await updateDoc(cartRef, {
              items: arrayUnion({ ...recipe, quantity: 1 }),
            });
          }
        } else {
          await setDoc(cartRef, { items: [{ ...recipe, quantity: 1 }] });
        }
      }
  
      // Dispatch cart update event for UI sync
      window.dispatchEvent(new Event("cartUpdate"));
      message.success("Product added in cart")
  
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Failed to add item to cart.");
    }
  };

  return (
    <>
      <div className="group space-y-6 border border-gray-100 rounded-3xl bg-white px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10">
        <Image
          className="mx-auto rounded-2xl"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
          width={500}
          height={500}
        />
        <h3 className="text-2xl font-semibold text-gray-800">{recipe.strMeal}</h3>
        
        <button
          onClick={addToCart}
          className="relative overflow-hidden mt-4 px-4 py-2 bg-yellow-300 rounded hover:bg-yellow-400 transition-all duration-200 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default AllRecipeCard;
