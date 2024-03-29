import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const CareGiverForms = () => {
  const [forms, setForms] = useState([]);
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  const caregiverEmail = userInfo ? userInfo.email : null;

  useEffect(() => {
    const fetchForms = async () => {
      try {
        // Ensure this endpoint correctly points to your backend
        const response = await axios.get('/forms/get-all');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const handleSubmit = async (event, formId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const answers = [];
  
    for (let [key, value] of formData.entries()) {
      const questionIndex = key.split('-')[1];
      const questionLabel = forms.find(form => form._id === formId).questions[questionIndex].questionLabel;
      answers.push({ questionLabel, answer: value });
    }
  
    const submittedBy = caregiverEmail; // This should be dynamically set based on the logged-in user
  
    try {
      await axios.post('/api/forms/submit', { formId, answers, submittedBy }); // Include submittedBy in the payload
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };
  

  return (
    <Container>
      {forms.map((form, formIndex) => (
        <Card key={form._id} className="mb-4">
          <Card.Body>
            <Card.Title>{form.formName}</Card.Title>
            <Form onSubmit={(e) => handleSubmit(e, form._id)}>
              {form.questions.map((question, questionIndex) => (
                <Form.Group as={Row} className="mb-3" key={question._id}>
                  <Form.Label column sm={2}>{question.questionLabel}</Form.Label>
                  <Col sm={10}>
                    {question.fieldType === 'text' ? (
                      <Form.Control type="text" name={`question-${questionIndex}`} />
                    ) : question.fieldType === 'multipleChoice' ? (
                      <Form.Control as="select" name={`question-${questionIndex}`}>
                        {question.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>{option}</option>
                        ))}
                      </Form.Control>
                    ) : null}
                  </Col>
                </Form.Group>
              ))}
              <Button variant="primary" type="submit">Submit Form</Button>
            </Form>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default CareGiverForms;
