# Recipe App

# Search section bugs :

The previous code had issues with state management and event handling: e.preventDefault() was missing, causing page refreshes, and searchInput was improperly managed, leading to filtering errors. The updated code resolves these by adding e.preventDefault(), ensuring searchInput is treated as a string, handling case-insensitive searches, and filtering only when a query exists. These fixes improve functionality and prevent stale or incorrect results.

# Modal Bugs:

The issue occurs because recipeId isn't passed to SingleRecipe, and the modal lacks proper state and data handling. To fix this, pass the recipeId and setIsOpen to SingleRecipe so it can fetch the correct details and close the modal when needed. Update getRecipeDetails to use async/await for predictable data fetching, ensuring the recipe details are fully loaded before rendering. This will display the correct data in the modal.

# New features:


# All Recipe List and Add to cart :

Technical Summary:
The implementation involves two main parts: the HttpKit module and the AllRecipeCard frontend component.

HttpKit: A set of functions that interact with the MealDB API to fetch recipes based on different filters (area, category, ingredient) and other attributes (top recipes, all recipes, recipe details).
AllRecipeCard: A React component that displays individual recipe cards. It allows users to add recipes to their cart, which is managed both in local storage (for persistence across sessions) and Firestore (for synchronization with logged-in users). The component also handles error messages and cart updates, including UI synchronization.

Non-Technical Summary:
The solution is designed to provide users with a smooth experience when browsing and adding recipes to their cart. Recipes are fetched from an online meal database and displayed on individual recipe cards. Users can add meals to their cart, and the cart is saved in their browser for future visits. For logged-in users, the cart is also saved in a cloud database, ensuring their cart is synchronized across devices. Success or error messages are displayed to keep the user informed of their actions.

# Signup and Login.
This setup allows users to sign up and log in using Firebase Authentication in a React app. The user can:

Signup: Enter their name,phone,email and password to create a new account.
Login: Use their credentials to access their account.
Logout: Sign out of the current session.
After successful authentication, users can be redirected to the user cart page, and their session is managed with Firebase. If users are logged in, their cart data will be synced with Firebase Firestore for persistence. For navigation and access control, React Router and ProtectedRoute are used to ensure only authenticated users can access certain pages.

# Navbar:
The Navbar component now includes the following updates:

Cart Items Quantity: Displays the number of items currently in the cart, dynamically updating as the user adds items.
User Icon for Logged-In Users: If the user is logged in, a user icon appears on the navbar.
Clicking on the user icon shows a dropdown menu, allowing the user to navigate to the Dashboard or Logout.
The Logout option logs the user out and updates the UI accordingly.
These changes provide a more interactive and user-friendly navigation experience.
# Cart Page:

The CartPage component displays the items added to the cart by the user. It retrieves cart data from localStorage if the user is not logged in, or from Firestore if the user is logged in.

If the user is logged in, cart items are fetched from Firestore (stored in a collection named "carts" linked to the user).
If the user is not logged in, cart items are fetched from localStorage.
The page updates the cart items dynamically and allows the user to view their selected items.