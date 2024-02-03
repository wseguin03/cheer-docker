import React, { useState, useEffect } from 'react';
import cheerLogo from '../assets/olli-cheer-logo.png';
import { Container, Col, Row } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  const [text, setText] = useState('');
  const fullText = "Too be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family.";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length - 1) {
        setText((prevText) => prevText + fullText[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 15); // Adjust speed as needed

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="main">
      <Container className="caregiver-dashboard">
        <Row className="text-center">
          <Col>
            <img id="logo-img" src={cheerLogo} alt="CHEER Logo" style={{ width: '10%' }} />
          </Col>
        </Row>
        <Row className="text-center">
          <Col className="cheer-title">
            <h1>CHEER Home</h1>
          </Col>
        </Row>
        <Row>
          <Col className="vision-statement">
            <h2>Our Vision</h2>
            <p>{text}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
