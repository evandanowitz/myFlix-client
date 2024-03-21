import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./movie-view.scss";

export const MovieView = ({ movies, Username, user, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie]);

  const addToFavorites = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!movie || !Username) {
      console.error("Selected movie or Username not found", movie, Username, user);
      return;
    }
    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}/movies/${movie._id}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
        if (!response) {
          console.error("No response received");
          return;
        }
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }
        return response.json();
      }).then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(true); // Update the state after a successful API response
        if (data && data.Username) {
          alert("Movie ADDED to Favorites List");
          updateUser(data);
        }
      }).catch((error) => {
      console.error("Error adding movie to favorites:", error);
    })
  };

  const rmvFromFavorites = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!movie || !Username) {
      console.error("Selected movie or Username not found");
      return;
    }
    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
        if (!response) {
          console.error("No response received");
          return;
        }
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }
        return response.json();
      }).then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(false); // Update the state after a successful API response
        if (data && data.Username) {
          alert("Movie REMOVED from Favorites List");
          updateUser(data);
        }
      }).catch((error) => {
      console.error("Error adding movie to favorites:", error);
    })
  };

  return (
    <>
      <Row className="my-3 justify-content-md-center">
          <Col md={12}>
            <img src={movie.ImagePath} className="w-100" />
          </Col>
          <Col md={12} className="col-12">
            <div className="my-1">
              <span className="h3">Title: </span>
              <span className="h3">{movie.Title}</span>
            </div>
            <div className="my-1">
              <span className="h6">Description: </span>
              <span>{movie.Description}</span>
            </div>
            <div className="my-1">
              <span className="h6">Genre: </span>
              <span>{movie.Genre.Name}</span>
            </div>
            <div className="my-1">
              <span className="h6">Director: </span>
              <span>{movie.Director.Name}</span>
            </div>
            <div className="my-1">
              <span className="h6">Featured: </span>
              <span>{movie.Featured ? "Yes" : "No"}</span>
            </div>
            <Button className="my-1" style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>Back</Button>
            { isFavorite ? 
              <Button variant="primary" className="mt-auto" onClick={rmvFromFavorites}>Remove from Favorites</Button>
            :
              <Button variant="primary" className="mt-auto" onClick={addToFavorites}>Add to Favorites</Button>
            }
          </Col>
      </Row>
    </>
  );
};

// Define all props constraints for MovieView
// MovieView.propTypes = {
//   movies: PropTypes.shape([{
//     Title: PropTypes.string,
//     Description: PropTypes.string,
//     Genre: {
//       Name: PropTypes.string,
//       Description: PropTypes.string
//     },
//     Director: {
//       Name: PropTypes.string,
//       Bio: PropTypes.string,
//       Birth: PropTypes.date,
//       Death: PropTypes.date
//     },
//     ImagePath: PropTypes.string,
//     Featured: PropTypes.boolean
//   }]).isRequired
// };