import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-db-movie-app-af5513e7733f.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
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
  }, [token]);

  return (
    <>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col sm={6} md={4}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <>
            <Row>
              <Col>
                <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); } }>Logout</Button>
              </Col>
            </Row>
            <Col md="fluid">
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)} 
              />
            </Col>
          </>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            <Row>
              <Col>
                <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); } }>Logout</Button>
              </Col>
            </Row>
            <Row>
              {movies.map((movie) => (
                <Col className="mb-3" key={movie.id} sm={12} md={6} lg={4} xl={3} xxl={2}>
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    } } 
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Row>
    </>
  );
};