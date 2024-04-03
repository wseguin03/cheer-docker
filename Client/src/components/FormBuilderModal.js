import React, { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const FormBuilderModal = ({ show, handleClose, formToEdit, handleFormDeleted }) => {
  const [formName, setFormName] = useState('');
  const [questions, setQuestions] = useState([{ questionLabel: '', fieldType: '', options: [], selectMultiple: false }]);

  const handleFormNameChange = (e) => setFormName(e.target.value);

  

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index][e.target.name] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleSelectMultipleChange = (questionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].selectMultiple = e.target.checked;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionLabel: '', fieldType: '', options: [], selectMultiple: false }]);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  useEffect(() => {
    // Only set the state if formToEdit is not null
    if (formToEdit) {
      setFormName(formToEdit.formName);
      setQuestions(formToEdit.questions || [{ questionLabel: '', fieldType: '', options: [], selectMultiple: false }]);
    } else {
      // reset to default if there's no form to edit (creating a new form)
      setFormName('');
      setQuestions([{ questionLabel: '', fieldType: '', options: [], selectMultiple: false }]);
    }
  }, [formToEdit]);


  const submitForm = async () => {
    const endpoint = formToEdit
      ? `/api/forms/${formToEdit._id}` 
      : '/api/forms/forms';
    const method = formToEdit ? 'put' : 'post';
  
    try {
      const response = await axios({
        method,
        url: endpoint,
        data: { formName, questions },
      });
      console.log('Form submitted:', response.data);
      handleClose(); // Close the modal upon successful submission
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Form Name</Form.Label>
            <Form.Control
              type="text"
              value={formName}
              onChange={handleFormNameChange}
              placeholder="Enter form name"
            />
          </Form.Group>
          {questions.map((question, index) => (
            <div key={index} className="mb-3">
              <Form.Group>
                <Form.Label>Question Label</Form.Label>
                <Form.Control
                  type="text"
                  name="questionLabel"
                  value={question.questionLabel}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Enter question label"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Field Type</Form.Label>
                <Form.Select
                  name="fieldType"
                  value={question.fieldType}
                  onChange={(e) => handleQuestionChange(index, e)}
                >
                  <option value="">Select field type</option>
                  <option value="text">Text</option>
                  <option value="multipleChoice">Multiple Choice</option>
                </Form.Select>
              </Form.Group>
              {question.fieldType === 'multipleChoice' && (
                <div>
                  <Form.Check
                    type="checkbox"
                    label="Allow multiple selections"
                    checked={question.selectMultiple}
                    onChange={(e) => handleSelectMultipleChange(index, e)}
                  />
                  {question.options.map((option, optionIndex) => (
                    <Form.Group key={optionIndex} className="mb-2">
                      <Form.Control
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    </Form.Group>
                  ))}
                  <Button variant="info" onClick={() => addOption(index)}>Add Option</Button>
                </div>
              )}
            </div>
          ))}
          
          <Button variant="primary" onClick={addQuestion}>Add Question</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="success" onClick={submitForm}>Submit Form</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormBuilderModal;
