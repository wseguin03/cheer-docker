import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import rockGlenImg  from '../assets/rockglen.png';
import algarvaImg  from '../assets/algarva.png';
import ontarioImg  from '../assets/ontario-caregiver.png';
import sunsetImg  from '../assets/sunsetcommunity.png';



const SponsorsPage = () => {

  // Event handlers for button clicks
  const handleContactClick = () => {
    // logic to navigate to Contact Info
    console.log('Navigate to Contact Info');
  };

  const handleGalleryClick = () => {
    // logic to navigate to Photo Gallery
    console.log('Navigate to Photo Gallery');
  };

  const SponsorCard = ({ image, title }) => {
    return (
      <Col className=" justify-content-center align-items-center">
        <motion.div initial={{ opacity: 0, y: -20, scale:1}} whileHover={{ opacity: 1, scale: 1.1, rotate: 360 }} animate={{ opacity: 1, y: 0}} transition={{ duration: 0.7 }}>
          <Card className='border-0' style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
            <Card.Body className="d-flex flex-column justify-content-between align-items-center">
            <div className="text-center">
              <Card.Title>{title}</Card.Title>
            </div>
            <div>
              <img src={image} alt={title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>
            
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
    );
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Sponsors Page</h1>
      <p className="text-center">A big thank you to all our sponsors!</p>
      <Row xs={1} md={2} lg={4} className="g-4">
        <SponsorCard image={rockGlenImg} title="Rock Glen Resort" />
        <SponsorCard image={algarvaImg} title="Algarva 168 Grand Bend" />
        <SponsorCard image={sunsetImg} title="Sunset Community Foundation" />
        <SponsorCard image={ontarioImg} title="Ontario Caregivers Association" />
      </Row>        
        
    </Container>
  );
};

export default SponsorsPage;
