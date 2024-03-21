import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewsletterModal = ({ show, handleClose, handleSubmit, subject, setSubject, content, setContent, setFile }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Newsletter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicSubject">
            <Form.Label>Subject:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter email subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicContent">
            <Form.Label>Content:</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Enter email content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>File:</Form.Label>
            <Form.Control 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Close
          </Button>
          <Button variant="primary" type="submit">
            Send Newsletter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewsletterModal;
