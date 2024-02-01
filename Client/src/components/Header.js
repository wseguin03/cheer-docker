import React from 'react';
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Collapse id="navbarNavDropdown">
                    <Nav className="ml-auto">
                        <NavItem>
                            <Link to='/' className="nav-link">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/contact' className="nav-link">Contact</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/sponsors' className="nav-link">Sponsors</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/client' className="nav-link">Client</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/caregiver' className="nav-link">Caregiver</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/admin' className="nav-link">Admin</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' className="nav-link">Login</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;