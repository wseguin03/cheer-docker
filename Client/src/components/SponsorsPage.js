import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';


const SponsorsPage = () => {

  // Event handlers for button clicks
  const handleGoalsClick = () => {
    // logic to navigate to Goals
    console.log('Navigate to Goals');
  };

  const handlePlansClick = () => {
    // logic to navigate to Future Plans
    console.log('Navigate to Future Plans');
  };

  const handleContactClick = () => {
    // logic to navigate to Contact Info
    console.log('Navigate to Contact Info');
  };

  const handleGalleryClick = () => {
    // logic to navigate to Photo Gallery
    console.log('Navigate to Photo Gallery');
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Sponsors Page</h1>
      <p className="text-center">Here are our sponsors **more info to be added**</p>
      <Row xs={1} md={2} lg={4} className="g-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Goals</Card.Title>
              <Button variant="primary" onClick={handleGoalsClick}>View Goals</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Future Plans</Card.Title>
              <Button variant="secondary" onClick={handlePlansClick}>View Plans</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Contact Info</Card.Title>
              <Button variant="success" onClick={handleContactClick}>Get in Touch</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Photo Gallery</Card.Title>
              <Button variant="info" onClick={handleGalleryClick}>Browse Gallery</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SponsorsPage;
