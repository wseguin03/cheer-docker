import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ContactPage = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          body,
          fullName,
          phoneNumber,
          email,
        }),
      });
      alert('Email sent successfully!');
      // Reset form fields
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setSubject('');
      setBody('');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          {/* Contact Form */}
          <Card className="shadow-lg" border="primary">
            <Card.Body>
              <Card.Title className="text-center text-primary">Contact Us</Card.Title>
              <Form onSubmit={handleSubmit}>
                {/* Form Groups for Full Name, Email, Phone Number, Subject, and Message */}
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="border-primary" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border-primary" />
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="border-primary" />
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="border-primary" />
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="formBody">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Your message" value={body} onChange={(e) => setBody(e.target.value)} required className="border-primary" />
                </Form.Group>
  
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Send Email
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
  
        <Col md={6}>
          {/* Hours of Operation and Contact Info */}
          <Card className="shadow-lg mb-4" border="primary">
            <Card.Body>
              <Card.Title className="text-center text-primary">Our Contact Info</Card.Title>
              <p className="text-center">
                Address: 8685 Rockglen Rd. Arkona ON, N0M 1B0
                <br />
                Send us an email: ongoinglivinglearning@gmail.com
                <br />
                Phone Number: to come… we’re getting a landline put in our office next month.
                <br />
              </p>
            </Card.Body>
          </Card>
  
          <Card className="shadow-lg mb-4" border="primary">
            <Card.Body>
              <Card.Title className="text-center text-primary">Hours of Operation</Card.Title>
              <br/>
              <Row>
                <Col md={6}>
                  <Card.Subtitle className='text-center text-secondary' >CHEER Group 1</Card.Subtitle>
                  <p className="text-center">
                    Monday: 8:00-4:00
                    <br />
                    Tuesday: 8:00-4:00
                    <br />
                    Wednesday: 10:00-4:00
                    <br />
                    Thursday: 8:00-4:00
                    <br />
                    Friday: 8:00-4:00
                    <br />
                    Saturday: CLOSED
                    <br />
                    Sunday: CLOSED
                    <br />
                    *outing times may differ*
                  </p>
                </Col>
                <Col md={6}>
                  <Card.Subtitle className='text-center text-secondary' >CHEER Connections & CHEER Works</Card.Subtitle>
                  <p className="text-center">
                    <strong>CHEER Connections</strong><br />
                    Summer Nights<br />
                    Friday: 5:00-9:00<br />
                    <br />
                    <strong>CHEER Works</strong><br />
                    Wednesday to Friday: 10:00-8:00<br />
                    Saturday & Sunday: 8:00-8:00<br />
                    *Hours may differ for long weekends*<br />
                    *Store opens May 18th 2024*
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};  

export default ContactPage;
