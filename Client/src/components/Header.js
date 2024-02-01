import React, { useEffect, useState } from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
function Header() {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href='/'>
                            <Link to='/'>
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='/contact'>
                            <Link to='/contact'>
                                Contact
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='/sponsors'>
                            <Link to='/sponsors'>
                                Sponsors
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='/client'>
                            <Link to='/client'>
                                Client
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='/caregiver'>
                            <Link to='/caregiver'>
                                Caregiver
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='/admin'>
                            <Link to='/admin'>
                                Admin
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='/login'>
                            <Link to='/login'>
                                Login
                            </Link>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;