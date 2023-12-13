// Defined the "MovieView" component using the destructured parameters `({ movie, onBackClick })`
export const MovieView = ({ movie, onBackClick }) => {
  return (
    // Return a div element representing the main container for displaying detailed information about a movie
    <div>
      <div>
        <span>Title: </span> {/* Label for the title of the movie */}
        <span>{movie.title}</span> {/* Displaying the title of the selected movie */}
      </div>
      <div>
        <span>Description: </span> {/* Label for the description of the movie */}
        <span>{movie.description}</span> {/* Displaying the description of the selected movie */}
      </div>
      <div>
        <span>Genre: </span> {/* Label for the genre of the movie */}
        <span>{movie.genre}</span> {/* Displaying the genre of the selected movie */}
      </div>
      <div>
        <span>Director: </span> {/* Label for the director of the movie */}
        <span>{movie.director}</span> {/* Displaying the director of the selected movie */}
      </div>
      <div>
        <span>Featured: </span> {/* Label for whether the movie is featured or not */}
        <span>{movie.featured ? "Yes" : "No"}</span> {/* Displaying whether the movie is featured or not */}
      </div>
      {/* Button to go back to the main view, triggering the onBackClick callback */}
      <button onClick={onBackClick}>Back</button>
      <div>
        <img src={movie.image} />  {/* Displaying the image of the selected movie */}
      </div>
    </div>
  );
};