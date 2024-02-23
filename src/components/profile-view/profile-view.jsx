import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Card } from "react-bootstrap";

export const ProfileView = () => {

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [userData, setUserData] = useState(user ? user : null);
  const Username = user ? user.Username : null;

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleShowUserInfo = () => {
    setShowUserInfo(true);
  };
  const handleHideUserInfo = () => {
    setShowUserInfo(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("newData:", newUsername, newPassword, newEmail, newBirthday);

    const newData = {
      Username: newUsername,
      Password: newPassword,
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
        setUserData(newData);
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
    if (!token) {
      return;
    }

    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((userData) => {
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
          {showUserInfo && userData && (
            <div>
              <Card.Text>Username: {userData.Username}</Card.Text>
              <Card.Text>Email: {userData.Email}</Card.Text>
              <Card.Text>Birthday: {userData.Birthday}</Card.Text>
            </div>
          )}
        </Card.Body>
        {!showUserInfo && (
          <Button type="button" onClick={handleShowUserInfo} variant="primary">
            Show User Info
          </Button>
        )}
        {showUserInfo && (
          <Button type="button" onClick={handleHideUserInfo} variant="primary">
            Hide User Info
          </Button>
        )}
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
          <Form.Group controlId="newPassword">
            <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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