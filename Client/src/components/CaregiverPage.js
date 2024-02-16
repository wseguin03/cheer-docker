import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const CaregiverPage = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          // Send email to the new caregiver newsletter signup endpoint
          await fetch('http://localhost:3001/subscribe-newsletter', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email,
              }),
          });
          alert('Newsletter signup successful!');
          // Reset the email input field after submission
          setEmail('');
      } catch (error) {
          console.error('Failed to process caregiver newsletter signup:', error);
          alert('Failed to sign up for the newsletter. Please try again later.');
      }
  };
  

    return (
      <Container className="caregiver-dashboard">
      <h1 className="text-center my-4">Hello Caregivers!</h1>
      <Row className="text-center">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Your Profile</Card.Title>
              <Button variant="primary" className="m-2">Profile Picture</Button>
              <Button variant="secondary" className="m-2">Bio</Button>
              <Button variant="secondary" className="m-2">Relationship to CHEER Member</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              <Button variant="success" className="m-2">Newsletter</Button>
              <Button variant="warning" className="m-2">Events of the Month</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Button variant="info" className="m-2">Your Phone Number</Button>
              <Button variant="dark" className="m-2">Your Email</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Newsletter Signup</Card.Title>
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
                <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">Sign up</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    );
  };
  
  export default CaregiverPage;