import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    // Get userInfo from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">CHEER</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavDropdown" />
                <Navbar.Collapse id="navbarNavDropdown">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to='/contact'>Contact</Nav.Link>
                        <Nav.Link as={NavLink} to='/sponsors'>Sponsors</Nav.Link>
                        {userInfo.userType === 'client'  && <Nav.Link as={NavLink} to='/client'>Client</Nav.Link>}
                        {userInfo.userType === 'caregiver'  && <Nav.Link as={NavLink} to='/caregiver'>Caregiver</Nav.Link>}
                        {userInfo.userType === 'admin'  && <Nav.Link as={NavLink} to='/admin'>Admin</Nav.Link>}
                        {userInfo.userType === 'staff'  && <Nav.Link as={NavLink} to='/staff'>Staff</Nav.Link>}

                        {userInfo.token ? (
                            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;