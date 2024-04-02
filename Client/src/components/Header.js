import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import homeImg from '../icons/home.png'
import accountImg from '../icons/account.png'
import adminImg from '../icons/admin.png'
import contactImg from '../icons/contact.png'
import loginImg from '../icons/login.png'
import logoutImg from '../icons/logout.png'
import sponsorImg from '../icons/sponsor.png'
import galleryImg from '../icons/gallery.png'





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
                <Navbar.Brand href="/"><img src={homeImg}/> CHEER</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavDropdown" />
                <Navbar.Collapse id="navbarNavDropdown">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to='/contact'><img src={contactImg}/> Contact</Nav.Link>
                        <Nav.Link as={NavLink} to='/sponsors'><img src={sponsorImg}/> Sponsors</Nav.Link>
                        <Nav.Link as={NavLink} to='/gallery'><img src={galleryImg}/> Gallery</Nav.Link>
                        {userInfo.userType === 'client'  && <Nav.Link as={NavLink} to='/client'><img src={accountImg}/> Client</Nav.Link>}
                        {userInfo.userType === 'caregiver'  && <Nav.Link as={NavLink} to='/caregiver'><img src={accountImg}/> Caregiver</Nav.Link>}
                        {userInfo.userType === 'admin'  && <Nav.Link as={NavLink} to='/admin'><img src={adminImg}/> Admin</Nav.Link>}
                        {userInfo.userType === 'admin'  && <Nav.Link as={NavLink} to='/viewtimesheets'>View Time Sheets</Nav.Link>}

                        {userInfo.userType === 'staff'  && <Nav.Link as={NavLink} to='/staff'><img src={accountImg}/> Staff</Nav.Link>}

                        {userInfo.token ? (
                            <Nav.Link onClick={logoutHandler}><img src={logoutImg}/> Logout</Nav.Link>
                        ) : (
                            <Nav.Link as={NavLink} to='/login'><img src={loginImg}/> Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;