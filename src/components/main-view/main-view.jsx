// Importing React into main-view.jsx file
import React from "react";
// Importing useState hook into main-view.jsx file from "react" module
import { useState } from "react";
// Importing MovieCard component from movie-card.jsx file
import { MovieCard } from "../movie-card/movie-card"; // How you import one component into another
// Importing MovieView component from movie-view.jsx file
import { MovieView } from "../movie-view/movie-view"; // How you import one component into another

// Define the "MainView" component as the main view of the app
export const MainView = () => {
  // Used the "useState" hook to manage the state of the movie list ("movies") and the selected movie ("selectedMovie")
  const [movies, setMovies] = useState([
    // Populated the "movies" state with an array of movie objects
    { 
      id: 1, 
      title: "The Dark Knight", 
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 
      genre: "Action",
      director: "Christopher Nolan",
      image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg", 
      featured: true
    },
    { 
      id: 2, 
      title: "Inception", 
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.", 
      genre: "Action",
      director: "Christopher Nolan",
      image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg", 
      featured: true
    },
    { 
      id: 3, 
      title: "The Silence of the Lambs", 
      description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.", 
      genre: "Thriller",
      director: "Jonathan Demme",
      image: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg", 
      featured: true
    },
    { 
      id: 4, 
      title: "Parasite", 
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", 
      genre: "Thriller", 
      director: "Bong Joon Ho",
      image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg", 
      featured: false
    },
    { 
      id: 5, 
      title: "The Departed", 
      description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.", 
      genre: "Thriller", 
      director: "Martin Scorsese",
      image: "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_FMjpg_UX1000_.jpg", 
      featured: false
    }
  ]);

  // "useState" hook creates a state variable "selectedMovie" and corresponding function "setSelectedMovie" to manage the selected movie for detailed view
    // `const [selectedMovie, setSelectedMovie]` is a destructuring assignment of the array returned by the "useState" hook
      // First element "selectedMovie" is the current state value
      // Second element "setSelectedMovie" is a funtion that alows you to update the state value
    // `useState(null)` initializes the state variable "selectedMovie" with an initial value of "null"
  // State variables are used to keep track of and manage the dynamic data within a component
  // In simple terms:
    // This line is creating a piece of state "selectedMovie" that can hold a value
    // Initially, it is set to "null", meaning that at the start, no movie is selected
    // "setSelectedMovie" function is then used to update the value of "selectedMovie" as needed throughout component's lifecycle
    // This pattern is commonly used in React to manage and track changes in the app's state
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) { // If a movie is selected...
    return ( // Render "MovieView" component with the selected movie and a callback function to reset the selected movie
      <MovieView 
        movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)} // Defines a callback function to handle the click event on "Back" button in "MovieView"
      />
    );
  }

  if (movies.length === 0) { // If array of movies is empty...
    return <div>The list is empty!</div>; // Return a div with a message that the list is empty
  } else { // If array of movies is not empty...
  
  return ( // Render a div containing "MovieCard" components for each movie in the list
    <div>
      {movies.map((movie) => ( // Use "map" function to iterate over array of movies and render a "MovieCard" component for each
        <MovieCard
          key={movie.id} // Assigning a unique key to each "MovieCard" for efficient rendering
          movie={movie} // Pass the movie object as a prop (property) to the "MovieCard" component
          onMovieClick={(newSelectedMovie) => { // Provide a callback function "onMovieClick" to handle click event on a "MovieCard"
            setSelectedMovie(newSelectedMovie); // Set the selected movie to the clicked movie, triggering a re-render
          }}
        />
      ))}
    </div>
  );
}};