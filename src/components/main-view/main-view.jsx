import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card"; // This is how you import one component into another
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-db-movie-app-af5513e7733f.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movie data", data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death
            },
            ImagePath: movie.ImagePath,
            Featured: movie.Featured
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <div>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout 68</button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div>
        <div>The list is empty!</div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout 77</button>
      </div>
    );
  } else {
  
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie._id} 
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout 93</button>
    </div>
  );
}};