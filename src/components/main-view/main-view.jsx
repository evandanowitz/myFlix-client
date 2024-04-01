import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Form, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-db-movie-app-af5513e7733f.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => response.json())
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

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
      />
      <Form className="my-4">
        <Form.Control
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          placeholder="Search for movies..."
        />
      </Form>
      <Row className="justify-content-md-center my-5">
        <Routes>
          <Route 
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col sm={6} md={4}>
                    <SignupView />
                  </Col>
                )}
              </>
            } />
          <Route 
            path="/return-signup"
            element={
              <>
                <Col sm={6} md={4}>
                  <SignupView />
                </Col>
              </>
            } />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col sm={6} md={4}>
                    <LoginView 
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            } />
          <Route
            path="movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                      movies={movies}
                      Username={user.Username}
                      user={user}
                      updateUser={updateUser}
                    />
                  </Col>
                )}
              </>
            } />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      movies={movies}
                      updateUser={updateUser}
                    />
                  </Col>
                )}
              </>
            } />    
          <Route 
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies
                      .filter((movie) => {
                        return searchBar.toLowerCase() === "" 
                        ? movie 
                        : movie.Title.toLowerCase().includes(searchBar);
                      })
                      .map((movie) => (
                        <Col className="mb-3" key={movie._id} sm={12} md={6} lg={4} xl={3} xxl={2}>
                          <MovieCard 
                            movie={movie}
                           />
                        </Col>
                      ))
                    }
                  </>
                )}
              </>
            } />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};