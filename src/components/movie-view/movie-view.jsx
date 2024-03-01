import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
 
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);


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
            <Link to={`/`}>
              <Button className="my-1" style={{ cursor: "pointer" }}>Back</Button>
            </Link>
          </Col>
      </Row>
    </>
  );
};

// Define all props constraints for MovieView
MovieView.propTypes = {
  movies: PropTypes.shape([{
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: {
      Name: PropTypes.string,
      Description: PropTypes.string
    },
    Director: {
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.date,
      Death: PropTypes.date
    },
    ImagePath: PropTypes.string,
    Featured: PropTypes.boolean
  }]).isRequired
};
