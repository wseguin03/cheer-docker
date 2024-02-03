import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">CHEER</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavDropdown" />
                <Navbar.Collapse id="navbarNavDropdown">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to='/contact'>Contact</Nav.Link>
                        <Nav.Link as={NavLink} to='/sponsors'>Sponsors</Nav.Link>
                        <Nav.Link as={NavLink} to='/client'>Client</Nav.Link>
                        <Nav.Link as={NavLink} to='/caregiver'>Caregiver</Nav.Link>
                        <Nav.Link as={NavLink} to='/admin'>Admin</Nav.Link>
                        <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
