import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AdminPage = () => {
    return (
        <Container className="caregiver-dashboard">
        <h1 className="text-center my-4">Admin Dashboard</h1>
        <Row className="text-center">
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Donor Information</Card.Title>
                <Button variant="primary" className="m-2">Grants and Donors List</Button>
                <Button variant="secondary" className="m-2">Current Applications</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Edit Events</Card.Title>
                <Button variant="success" className="m-2">Edit Newsletter</Button>
                <Button variant="warning" className="m-2">Edit Events of the Month</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Clients and Caregive Info</Card.Title>
                <Button variant="info" className="m-2">Client Phone Numbers</Button>
                <Button variant="dark" className="m-2">Client Emails</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default AdminPage;