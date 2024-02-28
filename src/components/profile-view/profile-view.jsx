import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user, movies }) => {
// Now in ProfileView, I have access to the user that MainView has as well as the movies that MainView has. This allows me to not have to go to API or localStorage for anything.
// Now, ProfileView knows what MainView knows.
console.log(user, movies);

  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const Username = userData ? userData.Username : null;

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  // USER INFO CARD VARIABLES
  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleShowUserInfo = () => setShowUserInfo(true);
  const handleHideUserInfo = () => setShowUserInfo(false);

  // UPDATE USER CARD VARIABLES
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const handleShowUpdateForm = () => setShowUpdateForm(true);
  const handleHideUpdateForm = () => setShowUpdateForm(false);

  // DELETE USER CARD VARIABLES
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const handleShowDeleteForm = () => setShowDeleteForm(true);
  const handleHideDeleteForm = () => setShowDeleteForm(false);

  // NAVIGATE VARIABLE
  const navigate = useNavigate();

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