# Business Cards

## Project Description

**Name:** Business Cards

**Key Features:**

- **Content Management:** The platform allows users to create, edit, and delete content, which is automatically saved and processed on the server side.
- **Centralized Management:** Includes a main page for content display and a login system that provides access to the site management interface.
- **REST API Integration:** The project includes integration with server-side calls for data processing, simplifying technical implementation and support.

**Purpose:** The development of Business Cards is aimed at providing a tool for digital content management. The management system is developed to facilitate the publication and distribution of content.

## Installation

Follow these steps to set up and run the project:

1. **Clone the repository:**
   Use Git to clone the repository to your local machine:git clone https://github.com/MarinaPanchenko12345/business-cards.git
   Navigate to the project directory:cd business-cards

   2. **Install dependencies:**
      Install all the necessary dependencies using npm:npm install
      This command will download all the required Node modules based on the `package.json` file.

2. **Start the application:**
   Once the installation is complete, start the application with:`npm start`

This will runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

## Project Structure

This section outlines the main directories and files within the project, helping developers navigate and understand the codebase.

- **`src/`**: Main source directory containing all the application logic.
  - **`components/`**: Contains all React components used across the application.
    - **`auth/`**: Authentication related components (`Login`, `Signup`) with error handling via `useValidation` and form validation using `AuthValidationSchema` from `validationSchemes`.
      - **`SignupFormFields.js`**: Utilizes a map function to streamline form input handling.
    - **`cards/`**: Central page displaying cards from server requests. Handles likes, updates, and deletions based on user access.
      - **`Cards.js`**: Main application page for displaying cards.
      - **`FavCard.js`**: Shows cards liked by registered users, updates on unliking.
      - **`MyCard.js`**: Manages creating, updating, and deleting cards for registered users.
      - **`NewCard.js`, `UpdateCard.js`**: Forms for creating and updating cards, share common components through `CardFormFields` and use `CardValidationSchema` for validation.
      - **`ViewCard.js`**: Displays individual card details.
  - **`contexts/`**: Contexts for global state management like theme and search functionalities.
    - **`SearchContext.js`**: Enables card search functionality across components.
    - **`ThemeContext.js`**: Manages theme state for the application.
  - **`hooks/`**: Custom hooks for reusability and abstraction.
    - **`useCardAPI.js`**: Hook for making API calls related to cards.
    - **`useValidation.js`**: Hook for form validation processes.
  - **`models/`**: Defines form field structures to standardize form components.
    - **`CardFormFields.js`**: Used in `NewCard` and `UpdateCard` for form inputs.
    - **`SignupFormFields.js`**: Used in `Signup` for form inputs.
  - **`navbar/`**: Contains the navigation bar components, split into five parts to manage role-based access using `TokenSlice`.
  - **`pages/`**: Contains all the page components.
    - **`About.js`**: Simple informational page.
    - **`BusinessCards.js`**: Wrapper for `Cards` component.
    - **`Favorites.js`**: Displays `FavCard` component.
    - **`MyCards.js`**: Displays `MyCard` component.
    - **`Sandbox.js`**: A test or experimental page.
  - **`slices/`**: Redux slices for state management.
    - **`TokenSlice.js`**: Manages user authentication and role-based access.
  - **`tools/`**: Reusable components like alerts, loaders, and custom switches.
    - **`Alerts.js`, `BounceHeader.js`, `CustomizedSwitch.js`, `Loading.js`, `SearchBox.js`**
  - **`validationSchemes/`**: Joi schemas for validating form inputs.
    - **`AuthValidationSchema.js`**: Includes `LoginSchema` and `SignupSchema`.
    - **`CardValidationSchema.js`**: Used for validating new and updated card inputs.

This structure helps in managing and understanding the flow and functionalities of various parts of the application, ensuring that developers can quickly find and modify any aspect of the codebase.

## Technologies

This project leverages a variety of technologies, libraries, and frameworks to deliver a comprehensive user experience and robust backend integration. Below is a list of the primary technologies used:

- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **Redux and Redux Toolkit**: Used for state management within the React application, enhancing the ease of managing state across components.
- **Axios**: Promise-based HTTP client for making requests to external APIs.
- **React Router Dom**: Utilized for handling routing within the React application, enabling navigation between different components without reloading the page.
- **Material-UI (MUI)**: A popular React UI framework that provides ready-to-use components which follow Google's Material Design.
- **Joi**: An object schema description language and validator for JavaScript objects that supports building validation schemas with great precision.
- **JWT Decode**: Library to decode JSON Web Tokens (JWT) to extract details such as user roles and token expiration.
- **Emotion**: A library designed for writing CSS styles with JavaScript, providing powerful and predictable style composition.
- **React Spring**: A spring-physics based animation library that handles smooth animations in the React applications.
- **SweetAlert2**: A beautiful, responsive, customizable replacement for JavaScript popup boxes.
- **React Spinners**: A collection of loading spinner components that can be easily implemented into a React project.
- **@testing-library/react**: Provides light utility functions on top of react-dom and react-dom/test-utils, enabling tests to be more maintainable.

These technologies collectively form the backbone of the application, ensuring a scalable, maintainable, and user-friendly product.

## License

This project is currently under no specific open source license and is primarily intended for educational purposes as part of a coursework at HackerU. Please contact the author for permission before using or distributing this code in any form.

## Contact Information

If you have any questions or suggestions regarding this project, please feel free to contact:

- **Marina Panchenko**
  - **Phone:** 054-6753533
  - **Email:** [marishka100281@gmail.com](mailto:marishka100281@gmail.com)

Feedback and contributions to the project are always appreciated.
