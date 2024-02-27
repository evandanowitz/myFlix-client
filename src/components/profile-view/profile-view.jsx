import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileView = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const Username = userData ? userData.Username : null;

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleShowUserInfo = () => setShowUserInfo(true);
  const handleHideUserInfo = () => setShowUserInfo(false);

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
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.Username) {
        alert("Update successful");
        setUserData(newData);
        localStorage.setItem("user", JSON.stringify(response)); // After page updates, also update localStorage
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
      .then((responseData) => {
        setUserData({
          Username: responseData.Username,
          Email: responseData.Email,
          Birthday: responseData.Birthday
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
          <Button type="submit" onClick={handleSubmit} variant="primary">Update Info</Button>
        </Form>
      </Card>
    </Container>
  );
};