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

// Creates a MovieCard component. Must import into MainView to use it there
  // export const MovieCard = (props) => {
  //   return <div>{props.movie.title}</div>;
  // };
 
// Destrctured version with props. // Creates a MovieCard component. Must import into MainView to use it there
  // export const MovieCard = (props) => {
  //   const { movie } = props; 
  //   return <div>{movie.title}</div>;
  // };
