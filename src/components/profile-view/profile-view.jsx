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
              <Card.Text>Username: {userData.Username}</Card.Text>
              <Card.Text>Password: {userData.Password}</Card.Text>
              <Card.Text>Email: {userData.Email}</Card.Text>
              <Card.Text>Birthday: {userData.Birthday}</Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Form>
          <Form.Group controlId="updatedUsername">
            <Form.Label>New Username:</Form.Label>
              <Form.Control
                type="text"
                value={updatedUsername}
                onChange={(e) => setUpdatedUsername(e.target.value)}
                required
                minLength="6"
              />
          </Form.Group>
          <Form.Group controlId="updatedPassword">
            <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                value={updatedPassword}
                onChange={(e) => setUpdatedPassword(e.target.value)}
                required
                minLength="6"
              />
          </Form.Group>
          <Form.Group controlId="updatedEmail">
            <Form.Label>New Email:</Form.Label>
              <Form.Control
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                required
              />
          </Form.Group>
          <Form.Group controlId="updatedBirthday">
            <Form.Label>New Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={updatedBirthday}
                onChange={(e) => setUpdatedBirthday(e.target.value)}
                required
              />
          </Form.Group>
          <Button type="submit" onClick={handleSubmit} variant="top">
            Update Info
          </Button>
        </Form>
      </Card>
    </Container>
  );
};




// FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
  //   };
  // setMovies(moviesFromApi);
  // });