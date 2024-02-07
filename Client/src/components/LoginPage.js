import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './loginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registering, setRegistering] = useState(false); // State to toggle between login and registration
  const [message, setMessage] = useState(''); // For displaying messages to the user

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submit action (page reload)
    console.log('Login attempt with:', username, password);
    // Implement login logic here
  };

  //Client\src\assets\cheerGroupPic-loginpage.jpg

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Register attempt with:', username, password);
    // Send the username (email) and password to the server for registration
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
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
          <Form onSubmit={handleSubmit}>
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
