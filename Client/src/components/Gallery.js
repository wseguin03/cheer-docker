import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import gameImg  from '../assets/groupgame.jpg';
import mealImg  from '../assets/groupmeal.jpg';
import plantImg  from '../assets/groupplant.jpg';
import horse1Img  from '../assets/horse1.jpg';
import horse2Img  from '../assets/horse2.jpg';
import snow1Img  from '../assets/snowwalk.jpg';
import snow2Img  from '../assets/snow2.jpg';
import swingImg  from '../assets/swings.jpg';
import './Gallery.css'; 

 


const Gallery = () => {

const PhotoCard = ({ image, title }) => {
    return (
      <Col className=" justify-content-center align-items-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0}} transition={{ duration: 0.5 }}>
          <Card className='border-0 photo-card' style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
            <Card.Body className="d-flex flex-column justify-content-between align-items-center">
            <div>
              <img src={image} alt={title} style={{ maxWidth: '300px', maxHeight: '300px' }} />
            </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
    );
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Photo Gallery</h1>
      <p className="text-center">Some memories of our events and activities with our wonderful participants and staff!</p>
      <Row xs={1} md={2} lg={4} className="g-4">
        <PhotoCard image={gameImg} title="Group on bleachers at a game" />
        <PhotoCard image={mealImg} title="Group at table sharing a meal" />
        <PhotoCard image={plantImg} title="Group outside around a planted tree" />
        <PhotoCard image={horse1Img} title="Participant on a horse" />
        <PhotoCard image={horse2Img} title="Participant on a horse" />
        <PhotoCard image={snow1Img} title="Walking outside in the snow" />
        <PhotoCard image={snow2Img} title="Walking outside in the snow" />
        <PhotoCard image={swingImg} title="Group on the swings" />

      </Row> 
      </Container>
  )
};

export default Gallery;