// Defined the MovieCard component using the destructured parameters `({ movie, onMovieClick })`
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    // Returned div element representing a clickable movie card to trigger onMovieClick
    <div
      // Set up a click event handler to trigger the "onMovieClick" callback with the clicked "movie" object
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {/* Displaying the movie title within the card */}
      {movie.title}
    </div>
  );
};