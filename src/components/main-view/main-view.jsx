import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card"; // This is how you import one component into another
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
  
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}};