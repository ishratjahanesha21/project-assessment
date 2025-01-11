# Recipe App

# Search section bugs :

The previous code had issues with state management and event handling: e.preventDefault() was missing, causing page refreshes, and searchInput was improperly managed, leading to filtering errors. The updated code resolves these by adding e.preventDefault(), ensuring searchInput is treated as a string, handling case-insensitive searches, and filtering only when a query exists. These fixes improve functionality and prevent stale or incorrect results.

# Modal Bugs:

The issue occurs because recipeId isn't passed to SingleRecipe, and the modal lacks proper state and data handling. To fix this, pass the recipeId and setIsOpen to SingleRecipe so it can fetch the correct details and close the modal when needed. Update getRecipeDetails to use async/await for predictable data fetching, ensuring the recipe details are fully loaded before rendering. This will display the correct data in the modal.

# Additional Requirements:

- Consistent Design Style: Ensure that any new features match the design style of the existing application. Follow basic accessibility standards.
- Mobile Responsiveness: Make all pages responsive for mobile devices.

# Documentation Requirements:

- After completion, document under the README section.
- Features Implemented: Describe the new features you added, in both technical and non-technical terms.
- Bug Fixes: Briefly list the bugs you identified and fixed.
- Time Estimate: Indicate the total time spent on the assessment.

# N.B. Documentation should be brief and short, no need to go overboard with it.

# Submission Guidelines:

- Clone or ZIP Download the existing GitHub Code repository: https://github.com/khalek-repliq/frontend-assessment
- Get rid of the .git folder from the project.
- Make your necessary changes and upload your new project into your personal GitHub account as a public repository
- Host your final version on Vercel, Netlify, Firebase or similar platform and prepare your live link.
- You must submit your "GitHub Link" & "Live Link"
#   p r o j e c t - a s s e s s m e n t  
 