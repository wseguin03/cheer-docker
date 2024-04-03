import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import FormBuilderModal from './FormBuilderModal'; 

const FormsManager = ({ show, handleClose }) => {
  const [forms, setForms] = useState([]);
  const [selectedFormToEdit, setSelectedFormToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // State to control the visibility of the FormBuilderModal for editing

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/api/forms/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    if (show) { // Fetch forms only if the modal is shown
      fetchForms();
    }
  }, [show]); // Re-fetch forms every time the modal is shown

  const toggleVisibility = async (formId, isVisible) => {
    try {
      await axios.patch(`/api/forms/forms/${formId}/visibility`, { isVisible: !isVisible });
      const updatedForms = forms.map(form => form._id === formId ? { ...form, isVisible: !isVisible } : form);
      setForms(updatedForms);
    } catch (error) {
      console.error('Error toggling form visibility:', error);
    }
  };

  const deleteForm = async (formId) => {
    try {
      await axios.delete(`/api/forms/forms/${formId}`);
      const updatedForms = forms.filter(form => form._id !== formId);
      setForms(updatedForms);
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const handleEditClick = (form) => {
    setSelectedFormToEdit(form);
    setShowEditModal(true);
  };

  return (
    <>
      <Modal show={show} onHide={() => handleClose()} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Manage Forms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {forms.map(form => (
              <ListGroup.Item key={form._id} className="d-flex justify-content-between align-items-center">
                {form.formName}
                <div>
                  <Button variant={form.isVisible ? "warning" : "success"} onClick={() => toggleVisibility(form._id, form.isVisible)}>
                    {form.isVisible ? 'Hide' : 'Show'}
                  </Button>
                  <Button variant="primary" className="ms-2" onClick={() => handleEditClick(form)}>Edit</Button>
                  <Button variant="danger" className="ms-2" onClick={() => deleteForm(form._id)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
      {showEditModal && selectedFormToEdit && (
        <FormBuilderModal
          show={showEditModal}
          handleClose={() => { setShowEditModal(false); setSelectedFormToEdit(null); }}
          formToEdit={selectedFormToEdit}
        />
      )}
    </>
  );
};

export default FormsManager;
