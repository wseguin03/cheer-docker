import React from 'react';
import cheerLogo from '../assets/olli-cheer-logo.png'
import { Container, Col } from 'react-bootstrap'

const HomePage = () => {
  return (
    <Container>
      <div>
        <h1>CHEER</h1>
        <p>Our Vision:</p>
        <p>To be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family.</p>
        <img src={cheerLogo} alt="CHEER Logo" />
      </div>
    </Container>
  );
};

export default HomePage;
