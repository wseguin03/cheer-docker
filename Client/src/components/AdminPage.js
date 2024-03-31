import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsletterModal from './NewsletterModal';
import FormBuilderModal from './FormBuilderModal';
import withAuth from './WithAuth';
import { useNavigate } from 'react-router-dom'; 
import FormsManager from './FormManager';
import Modal from 'react-bootstrap/Modal';

const FilledFormsModal = ({ show, handleClose, forms, setForms }) => {
  const deleteForm = async (formId) => {
    try {
      // Make a DELETE request to your backend
      const response = await fetch(`/delete-filled-form/${formId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete the form');
      }
      // Remove the deleted form from the forms array
      const updatedForms = forms.filter(form => form._id !== formId);
      setForms(updatedForms); // Update the parent component's state
    } catch (error) {
      console.error('Error deleting the form:', error);
      alert('Could not delete the form. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Filled Forms</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forms.length > 0 ? (
          forms.map((form, index) => (
            <div key={index}>
              <h5>Form Name: {form.formId.formName}</h5>
              <p>Submitted By: {form.submittedBy}</p>
              <p>Submitted On: {new Date(form.submittedOn).toLocaleDateString()}</p>
              <div>
                {form.answers.map((answer, answerIndex) => (
                  <p key={answerIndex}><strong>{answer.questionLabel}:</strong> {answer.answer}</p>
                ))}
              </div>
              <Button variant="danger" onClick={() => deleteForm(form._id)}>Delete Form</Button>
              {index < forms.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p>No filled forms available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};





const AdminPage = () => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [showFormsManager, setShowFormsManager] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModalTitle, setUserModalTitle] = useState('');
  const [modalUsers, setModalUsers] = useState([]); 


  const [showFormBuilderModal, setShowFormBuilderModal] = useState(false);

  const handleShowFormBuilderModal = () => setShowFormBuilderModal(true);
  const handleCloseFormBuilderModal = () => setShowFormBuilderModal(false);


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCalendar = () =>{
    navigate('/calendar');
  }
  
  const [filledForms, setFilledForms] = useState([]);
  const [showFilledFormsModal, setShowFilledFormsModal] = useState(false);
  
  const fetchFilledForms = async () => {
    try {
      const response = await fetch('/filledForms/get-all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const forms = await response.json();
      setFilledForms(forms); // Save the fetched forms to state
      setShowFilledFormsModal(true); // Open the modal to display the forms
    } catch (error) {
      console.error('Error fetching filled forms:', error);
      alert('Failed to fetch filled forms');
    }
  };
  
  const fetchClients = async () => {
    try {
      const response = await fetch('/allclients');
      if (!response.ok) {
        throw new Error('Failed to fetch client information');
      }
      const data = await response.json();
      setModalUsers(data); 
      setUserModalTitle('Client Information'); 
      setShowUserModal(true); 
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchCaregivers = async () => {
    try {
      const response = await fetch('/allcaregivers');
      if (!response.ok) {
        throw new Error('Failed to fetch caregiver information');
      }
      const data = await response.json();
      setModalUsers(data); 
      setUserModalTitle('Caregiver Information'); 
      setShowUserModal(true); 
    } catch (error) {
      console.error('Error fetching caregivers:', error);
    }
  };
  
  const fetchStaff = async () => {
    try {
      const response = await fetch('/allstaff');
      if (!response.ok) {
        throw new Error('Failed to fetch staff information');
      }
      const data = await response.json();
      setModalUsers(data); 
      setUserModalTitle('Staff Information'); 
      setShowUserModal(true); 
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior, if called within a form

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('content', content);
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await fetch('/send-newsletter', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            alert('Newsletter sent successfully!');
            // Reset the form states and close modal here
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
            <Card.Title>Forms</Card.Title>
            <Button variant="primary" className="m-2" onClick={handleShowFormBuilderModal}>Form Builder</Button>
            <FormBuilderModal show={showFormBuilderModal} handleClose={handleCloseFormBuilderModal} />
            <Button variant="info" onClick={() => setShowFormsManager(true)}>View Forms</Button>
            <FormsManager show={showFormsManager} handleClose={() => setShowFormsManager(false)} />
            <Button variant="success" className="m-2" onClick={fetchFilledForms}>View Submitted Forms</Button>
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
            <Button variant="warning" onClick={handleCalendar} className="m-2">Edit Calendar</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>Clients and Caregiver Info</Card.Title>
            <Button variant="primary" className="m-2" onClick={fetchClients}>Fetch Client Info</Button>
            <Button variant="secondary" className="m-2" onClick={fetchCaregivers}>Fetch Caregiver Info</Button>
            <Button variant="info" className="m-2"onClick={fetchStaff}>Fetch Staff Info</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <FilledFormsModal
      show={showFilledFormsModal}
      handleClose={() => setShowFilledFormsModal(false)}
      forms={filledForms}
      setForms={setFilledForms} 
    />
    {/* User Info Modal for displaying Clients, Caregivers, and Staff */}
    <Modal show={showUserModal} onHide={() => setShowUserModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{userModalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalUsers.length > 0 ? (
          modalUsers.map((user) => (
            <div key={user._id}>
              <h5>Name: {user.firstName} {user.lastName}</h5>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowUserModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </Container>
);


  };
  
  export default withAuth(AdminPage, "admin");