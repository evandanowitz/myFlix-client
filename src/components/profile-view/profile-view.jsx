import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Card } from "react-bootstrap";

export const ProfileView = () => {

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [userData, setUserData] = useState(null);
  const Username = user ? user.Username : null;

  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedBirthday, setUpdatedBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          Username: data.Username,
          Password: data.Password,
          Email: data.Email,
          Birthday: data.Birthday
        });
      });
  }, [token]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>User Information</Card.Title>
          {userData && (
            <div>
              <p>Username: {userData.Username}</p>
              <p>Password: {userData.Password}</p>
              <p>Email: {userData.Email}</p>
              <p>Birthday: {userData.Birthday}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};




// FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
  //   };
  // setMovies(moviesFromApi);
  // });