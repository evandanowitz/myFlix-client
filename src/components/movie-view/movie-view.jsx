import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>

      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>

      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>

      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>

      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>

      <div>
        <span>Featured: </span>
        <span>{movie.Featured ? "Yes" : "No"}</span>
      </div>

      <button onClick={onBackClick}>Back</button>

      <div>
        <img src={movie.ImagePath} />
      </div>

    </div>
  );
};