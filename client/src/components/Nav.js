import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Nav() {
  const { logoutUser, user } = useContext(AuthContext);

  console.log(user);

  return (
    <Navbar>
      <Container>
        {user ? (
          <>
            <Link to="/">
              <button type="button" className="btn btn-warning">
                Home
              </button>
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link to="/">
                  <button onClick={logoutUser} type="button" className="btn btn-warning">
                    Logout
                  </button>
                </Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-warning">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-warning">Signup</button>
            </Link>{" "}
          </>
        )}
      </Container>
    </Navbar>
  );
}
