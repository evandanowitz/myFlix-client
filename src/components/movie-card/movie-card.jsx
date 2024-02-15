import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column">
        <Row>
          <Col>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Text>{movie.Genre.Name}</Card.Text>
          </Col>
        </Row>
        <Row className="mt-auto">
          <Col>
            <Button onClick={() => onMovieClick(movie)} variant="link">
              View More
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};