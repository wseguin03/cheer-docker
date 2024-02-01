import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ContactPage = () => {
  return (
    <Container className="contact-page">
      <h1 className="text-center my-4">Contact Us</h1>
      <Row className="text-center d-flex align-items-stretch">
        <Col md={6} className="mb-3">
          <Card className="h-100"> 
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Card.Text>
                If you are interested in the CHEER Program, CHEER Works, or CHEER Connections, please contact our fearless leader, Ivey Hartman.
              </Card.Text>
              <Button variant="primary" href="mailto:ihartmancheer@gmail.com" className="m-2">Email Ivey Hartman</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Follow Us</Card.Title>
              <Button variant="info" href="https://www.facebook.com/familyconnectionscheers/" target="_blank" className="m-2">Family Connections Cheer on Facebook</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
