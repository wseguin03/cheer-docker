import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ContactPage = () => {
  // react useState for email form fields
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // email form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: emailSubject,
          body: emailBody,
        }),
      });
      alert('Email sent successfully!');
      setEmailSubject('');
      setEmailBody('');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };
  
  return (
    <Container className="contact-page">
      <h1 className="text-center my-4">Contact Us</h1>
      <Row className="text-center d-flex align-items-stretch">
        <Col md={12} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmailSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmailBody">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter email body"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send Email
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
