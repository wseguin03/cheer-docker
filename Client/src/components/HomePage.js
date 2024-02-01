import React from 'react';
import cheerLogo from '../assets/olli-cheer-logo.png'
import { Container, Col, Button,  Row, Card } from 'react-bootstrap';


const HomePage = () => {
  return (
    <Container className="caregiver-dashboard">
    <Row className="text-center">
        <Col>
          <img id="logo-img" src={cheerLogo} alt="CHEER Logo" style={{ width: '10%' }} />
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <h1 className="my-4">CHEER Home</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Our Vision:</h2>
          <p>
            To be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family.
          </p>
        </Col>
      </Row>
  </Container>
  );
};

export default HomePage;
