import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsletterModal from './NewsletterModal';







const AdminPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior, if called within a form

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('content', content);
    if (file) {
        formData.append('file', file);
    }

    // Replace '/send-newsletter-with-attachment' with your actual endpoint
    try {
        const response = await fetch('/send-newsletter', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            alert('Newsletter sent successfully!');
            // Reset the form states and close modal here if needed
            setSubject('');
            setContent('');
            setFile(null);
            handleCloseModal();
        } else {
            // Handle server errors or invalid responses
            alert(`Failed to send newsletter: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending newsletter');
    }

    handleCloseModal();
};


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
                <Button variant="primary" onClick={handleShowModal}>Edit Newsletter</Button>
            <NewsletterModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                handleSubmit={handleSubmit}
                subject={subject}
                setSubject={setSubject}
                content={content}
                setContent={setContent}
                setFile={setFile}
            />
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