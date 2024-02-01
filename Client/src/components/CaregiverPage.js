import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CaregiverPage = () => {
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
              <Card.Title>Upcomoing Events</Card.Title>
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
    </Container>
    );
  };
  
  export default CaregiverPage;