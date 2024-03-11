import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import './loginPage.css';
import { set } from 'mongoose';
import Loading from './Loading';

const LoginPage = () => {
  const navigate = useNavigate(); // Correctly use useNavigate instead of useHistory
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // New state variable
  const [lastName, setLastName] = useState(''); // New state variable
  const [phoneNumber, setPhoneNumber] = useState(''); // New state variable
  const [registering, setRegistering] = useState(false); // State to toggle between login and registration
  const [message, setMessage] = useState(''); // For displaying messages to the user
  const [loginState, setLoginState] = useState(false);
  const [loading, setLoading] = useState(false); // New state variable
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      console.log('LOADING', loading);
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password}),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/caregiver'); // Use navigate for redirection
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoginState(true);
        setLoading(false);


      } else {
        setMessage(data.message || 'Login failed');
        setLoading(false);

      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Failed to login. Please try again.');
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Please check your email to verify your account.');
        setRegistering(false); // Switch back to login form
      } else {
        setMessage(data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Failed to register. Please try again.');
    }
  };

  const handleSubmit = (event) => {
    if (registering) {
      handleRegister(event);
    } else {
      handleLogin(event);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: '400px' }} className="p-4">
        <Card.Body>
          <h1 className="text-center mb-4">{registering ? 'Register' : 'Login'}</h1>
          {message && <Alert variant="info">{message}</Alert>}
          {loading && <Loading/>}

          <Form onSubmit={handleSubmit}>
            {registering && (
              <>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              {registering ? 'Register' : 'Login'}
            </Button>

            <Button variant="secondary" className="w-100" onClick={() => { setRegistering(!registering); setMessage(''); }}>
              {registering ? 'Switch to Login' : 'Switch to Register'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
