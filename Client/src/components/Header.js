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
                <Navbar.Brand href="/">
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href='/contact'>
                            <Link to='/contact'>
                                Contact
                            </Link>
                        </Nav.Link>
                        {/* <Nav.Link href='/public-lists'>
                            <Link to='/public-lists'>
                                Public Lists
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='/hero-search'>
                            <Link to='/hero-search'>
                                Search Heroes
                            </Link>
                        </Nav.Link>
                        <NavDropdown title="More" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/my-profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item
                                href="/"
                            >
                                Logout
                            </NavDropdown.Item>

                        </NavDropdown>
 */}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;