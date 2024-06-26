import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({
  user,
  onLoggedOut,
  searchBar,
  setSearchBar,
  handleSearchBarReset,
}) => {
  return (
    <Navbar bg="beige" expand="lg" className="mt-auto">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" onClick={handleSearchBarReset}>
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  onClick={handleSearchBarReset}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    onLoggedOut();
                    handleSearchBarReset();
                  }}
                >
                  Logout
                </Nav.Link>
                <Form className="my-4">
                  <Form.Control
                    value={searchBar}
                    onChange={(e) => setSearchBar(e.target.value)}
                    placeholder="Search for movies..."
                  />
                  <Button className="ml-2 mb-3" onClick={handleSearchBarReset}>
                    Reset
                  </Button>
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
