// This JavaScript file sets up the main structure of your React app. This file:
  // imports the necessary functions and components,
  // defines the main app component (MyFlixApp),
  // selects the root HTML element for rendering,
  // renders the MyFlixApp component using the createRoot function

// Importing the createRoot function from the react-dom/client module
import { createRoot } from "react-dom/client";
// Importing the MainView component from the specified file path
import { MainView } from "./components/main-view/main-view";
// Importing the styles from the "index.scss" file
import "./index.scss";

// Defining the main component of the application, "MyFlixApp"
const MyFlixApp = () => {
  // Returning the MainView component as the main content of the app
  return <MainView />;
};

// Selecting the HTML element with the id "root" as the container for the React app
const container = document.querySelector("#root");
// Creating a root for the React app using the createRoot function
const root = createRoot(container);
<<<<<<< Updated upstream
// Rendering the MyFlixApp component within the specified container
root.render(<MyFlixApp />);
=======
root.render(<MyFlixApp />); // Tells React to render your app in the root DOM element
>>>>>>> Stashed changes
