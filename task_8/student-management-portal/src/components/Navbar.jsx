import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Custom CSS file

const NavBar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="custom-brand">
          {/*<img
            width="55"
            height="55"
            src="" #here we can given any icon or small banner or image , our wish  
            alt="student"  
          />*/}
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="mx-auto p-2">
            <Nav.Link as={Link} to="/" className="custom-link">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/register" className="custom-link">Register Student</Nav.Link>
            <Nav.Link as={Link} to="/students" className="custom-link">Student List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
