import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import SimpleClickerGame from './SimpleClickerGame';
import KeyboardClickerGame from './KeyboardClickerGame';
import { useNavigate } from 'react-router-dom'; 
import './ClientPage.css'

const ClientPage = () => {
  const [showGameModal, setShowGameModal] = useState(false);
  const handleShowGameModal = (gameType) => {
    setCurrentGame(gameType);
    setShowGameModal(true);
  };
  const handleCloseGameModal = () => setShowGameModal(false);
  const [currentGame, setCurrentGame] = useState(null);

  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const handleShowUserInfoModal = () => setShowUserInfoModal(true);
  const handleCloseUserInfoModal = () => setShowUserInfoModal(false);

  //get client info
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  const userFirstName = userInfo ? userInfo.firstName : null;
  const userLastName = userInfo ? userInfo.lastName : null;
  const userEmail = userInfo ? userInfo.email : null;
  const userPhone = userInfo ? userInfo.phoneNumber : null;

  const navigate = useNavigate();
  const handleCalendar = () =>{
    navigate('/calendar');
  }




  return (
<div className="background-container"> {/* Container for the background image */}
    <Container className="client-dashboard">
      <h1 className="text-center my-4">Hey {userFirstName}! Welcome to Your Dashboard!</h1>
      <Row className="text-center">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Your Profile</Card.Title>
              <Button variant="primary" className="m-2" onClick={handleShowUserInfoModal}>Your Info</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Games!</Card.Title>
              <Button variant="secondary" className="m-2" onClick={() => handleShowGameModal('clicker')}>Clicker Game</Button>
              <Button variant="info" className="m-2" onClick={() => handleShowGameModal('keyboard')}>Keyboard Game</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Events!</Card.Title>
              <Button variant="warning" onClick={handleCalendar} className="m-2">View Event Calendar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showGameModal} onHide={handleCloseGameModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Computer Game!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {currentGame === 'clicker' && <SimpleClickerGame />}
        {currentGame === 'keyboard' && <KeyboardClickerGame />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGameModal}>Close</Button>
        </Modal.Footer>
      </Modal>
<Modal show={showUserInfoModal} onHide={handleCloseUserInfoModal}>
  <Modal.Header closeButton>
    <Modal.Title>Your Information</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p><strong>Full Name:</strong> {userFirstName} {userLastName}</p>
    <p><strong>Email:</strong> {userEmail}</p>
    <p><strong>Phone Number:</strong> {userPhone}</p>

  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseUserInfoModal}>Close</Button>
  </Modal.Footer>
</Modal>
    


    </Container>
    <div className='space'>  {/* happy easter -- this is an easter egg */}
    <h1 >h</h1>
    <h1 >h</h1>
    <h1 >h</h1>
    <h1 >h</h1>
    <h1 >h</h1>
    <h1 >h</h1>
    <h1 >h</h1>
    <h1 >h</h1>
    </div>


    </div>
  );
};

export default ClientPage;
