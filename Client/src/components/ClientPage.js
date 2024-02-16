import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import SimpleClickerGame from './SimpleClickerGame';
import KeyboardClickerGame from './KeyboardClickerGame';
import Form from 'react-bootstrap/Form';

const ClientPage = () => {
  const [showGameModal, setShowGameModal] = useState(false);
  const handleShowGameModal = (gameType) => {
    setCurrentGame(gameType);
    setShowGameModal(true);
  };
  const handleCloseGameModal = () => setShowGameModal(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const handleShowAboutModal = () => setShowAboutModal(true);
  const handleCloseAboutModal = () => setShowAboutModal(false);




  return (
    <Container className="client-dashboard">
      <h1 className="text-center my-4">Welcome to Your Dashboard!</h1>
      <Row className="text-center">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Your Profile</Card.Title>
              <Button variant="primary" className="m-2">Profile Picture</Button>
              <Button variant="secondary" className="m-2">Bio</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>About You</Card.Title>
              <Button variant="success" className="m-2" onClick={handleShowAboutModal}>About You</Button>
              <Button variant="warning" className="m-2" onClick={() => handleShowGameModal('clicker')}>Clicker Game</Button>
              <Button variant="info" className="m-2" onClick={() => handleShowGameModal('keyboard')}>Keyboard Game</Button>
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
      <Modal show={showAboutModal} onHide={handleCloseAboutModal}>
  <Modal.Header closeButton>
    <Modal.Title>About You</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFavoriteColor">
        <Form.Label>Favorite Color</Form.Label>
        <Form.Control type="text" placeholder="Enter your favorite color" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFavoriteFood">
        <Form.Label>Favorite Food</Form.Label>
        <Form.Control type="text" placeholder="Enter your favorite food" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFavoriteAnimal">
        <Form.Label>Favorite Animal</Form.Label>
        <Form.Control type="text" placeholder="Enter your favorite animal" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFavoriteActivity">
        <Form.Label>Favorite Activity</Form.Label>
        <Form.Control type="text" placeholder="Enter your favorite activity" />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseAboutModal}>Close</Button>
    <Button variant="primary" onClick={handleCloseAboutModal}>Save Changes</Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
};

export default ClientPage;
