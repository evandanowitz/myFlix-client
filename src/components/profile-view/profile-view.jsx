import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user, movies }) => {
// Now in ProfileView, I have access to the user and movies that MainView has. Don't have to go to API or localStorage for anything. Now, ProfileView knows what MainView knows.
  console.log(user, movies);

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

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const handleShowUpdateForm = () => setShowUpdateForm(true);
  const handleHideUpdateForm = () => setShowUpdateForm(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const handleShowDeleteForm = () => setShowDeleteForm(true);
  const handleHideDeleteForm = () => setShowDeleteForm(false);

  const navigate = useNavigate();

  // GET USER DATA FUNCTION
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => response.json())
    .then((responseData) => {
      console.log("responseData:", responseData);
      setUserData({
        Username: responseData.Username,
        Email: responseData.Email,
        Birthday: responseData.Birthday
      });
    });
  }, [token]);

  // UPDATE USER FUNCTION
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
    }).then((response) => response.json())
    .then((response) => {
      if (response.Username) {
        alert("Update successful");
        setUserData(newData);
        localStorage.setItem("user", JSON.stringify(response));
      }
    }).catch(error => {
      console.error("Error: ", error);
    });
  };

  // DELETE USER FUNCTION
  const handleDelete = (event) => {
    event.preventDefault();

    if (newUsername !== Username) {
      alert("Incorrect username. Please enter your username to delete your account.")
      return;
    }

    fetch(`https://myflix-db-movie-app-af5513e7733f.herokuapp.com/users/${Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUserData(null);
        localStorage.clear();
        alert("User successfully deleted");
        navigate("/return-signup");
      }
    });
  };

  return (
    <Container>
      {/* DISPLAY USER INFO CARD */}
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
          <Button type="button" onClick={handleShowUserInfo} variant="primary">Show User Info</Button>
        )}
        {showUserInfo && (
          <Button type="button" onClick={handleHideUserInfo} variant="primary">Hide User Info</Button>
        )}
      </Card>

      {/* UPDATE USER INFO CARD */}
      <Card>
        <Card.Body>
          <Card.Title>Update User</Card.Title>
          {showUpdateForm && (
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
            <Button type="submit" onClick={handleSubmit} variant="primary" className="mr-auto">Update Info</Button>
          </Form>
          )}
        </Card.Body>
        {!showUpdateForm && (
          <Button type="button" onClick={handleShowUpdateForm} variant="primary">Show Update Form</Button>
        )}
        {showUpdateForm && (
          <Button type="button" onClick={handleHideUpdateForm} variant="primary">Hide Update Form</Button>
        )}
      </Card>

      {/* DELETE USER CARD */}
      <Card>
        <Card.Body>
          <Card.Title>Delete User</Card.Title>
          {showDeleteForm && (
          <Form>
            <Form.Group controlId="newUsername">
              <Form.Label>Type Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                  minLength="6"
                />
            </Form.Group>
            <Button type="submit" onClick={handleDelete} variant="danger" className="ml-auto">Delete User</Button>
          </Form>
          )}
        </Card.Body>
        {!showDeleteForm && (
          <Button type="button" onClick={handleShowDeleteForm} variant="primary">
            Show Delete User Form
          </Button>
        )}
        {showDeleteForm && (
          <Button type="button" onClick={handleHideDeleteForm} variant="primary">
            Hide Delete User Form
          </Button>
        )}
      </Card>
    </Container>
  );
};