import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Container } from "react-bootstrap";
import { Button, Form, Card } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

export const ProfileView = () => {

  const token = localStorage.getItem("token");
  const Username = "ajbrown";
  console.log(token);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Username);
        console.log(data.Password);
        console.log(data.Email);
        console.log(data.Birthday);
          return { 
          // Need to change return statement. Look in console for whatever needs to go on right side of colon.
          // Left side is what you want to call it. Right side is what it actually is. Here, it'll be data."something"
            Username: data.Username,
            Password: data.Password,
            Email: data.Email,
            Birthday: data.Birthday,
            // FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
          };
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <div>
      <h1>This is the ProfileView</h1>
      <h4>Display user information</h4>
      <div>
        <p>Username:</p>
        <p>Password:</p>
        <p>Email:</p>
        <p>Birthday:</p>
        <p>Favorite Movies:</p>
      </div>
    </div>
  )
};