import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Card } from "react-bootstrap";

export const ProfileView = () => {

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [userData, setUserData] = useState(null);
  const Username = user ? user.Username : null;

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle submit triggered");

    console.log("newUsername:", newUsername);
    console.log("newEmail:", newEmail);
    console.log("newBirthday:", newBirthday);

    const newData = {
      Username: newUsername,
      Email: newEmail,
      Birthday: newBirthday
    };

    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }

    }).then((response) => {
      console.log(newData)
      if (response.ok) {
        alert("Update successful");
      } else if (newUsername.length < 6) {
        alert("Username must be 6 characters or longer.");
      } else if (newEmail.includes("@") === false) {
        alert("Please enter a valid email address.")
      } else {
        alert("Update failed");
      }
    }).catch(error => {
      console.error("Error: ", error);
    });
  };

  useEffect(() => {
    console.log("token:", token);
    console.log("Userame:", Username);
    console.log("userData:", userData);

    if (!token) {
      return;
    }

    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((storedData) => {
        setUserData({
          Username: user.Username,
          Email: user.Email,
          Birthday: user.Birthday
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
              <Card.Text>Email: {userData.Email}</Card.Text>
              <Card.Text>Birthday: {userData.Birthday}</Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Form>
          <Form.Group controlId="newUsername">
            <Form.Label>New Username:</Form.Label>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                minLength="6"
              />
          </Form.Group>
          <Form.Group controlId="newEmail">
            <Form.Label>New Email:</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
          </Form.Group>
          <Form.Group controlId="newBirthday">
            <Form.Label>New Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={newBirthday}
                onChange={(e) => setNewBirthday(e.target.value)}
                required
              />
          </Form.Group>
          <Button type="submit" onClick={handleSubmit} variant="primary">
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