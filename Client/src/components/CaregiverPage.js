import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const CaregiverPage = () => {
    const [clientEmail, setClientEmail] = useState('');
    const [clientFirstName, setClientFirstName] = useState('');
    const [clientLastName, setClientLastName] = useState('');
    const [clientPhoneNumber, setClientPhoneNumber] = useState('');
    const [clientPassword, setClientPassword] = useState('')
    const [email, setEmail] = useState(''); // State for the newsletter email
    const [message, setMessage] = useState(''); // State for displaying messages to the user
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator


    // Handler for client information change
    const handleClientInfoChange = (setter) => (e) => setter(e.target.value);

    // Handler for the newsletter email change
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleClientSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);
        

        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        const caregiverEmail = userInfo ? userInfo.email : null;
        console.log("Received caregiverId:", caregiverEmail);


        if (!caregiverEmail) {
            console.error("Caregiver ID is not available. Ensure the user is logged in.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/users/register-client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: clientFirstName,
                    lastName: clientLastName,
                    email: clientEmail,
                    phoneNumber: clientPhoneNumber,
                    password: clientPassword,
                    userType: 'client',
                    caregiverEmail: caregiverEmail,
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }
            const data = await response.json();

            if (response.ok) {
                setMessage('Client registration successful!');
                setClientEmail('');
                setClientFirstName('');
                setClientLastName('');
                setClientPhoneNumber('');
                setClientPassword('');
            } else {
                setMessage(data.message || 'An error occurred during client registration.');
            }
        } catch (error) {
            console.error('Client registration error:', error);
            setMessage('Failed to register client. Please try again.');
        } finally {
            setIsLoading(false); // End loading
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send email to the new caregiver newsletter signup endpoint
            await fetch('/subscribe-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });
            alert('Newsletter signup successful!');
            // Reset the email input field after submission
            setEmail('');
        } catch (error) {
            console.error('Failed to process caregiver newsletter signup:', error);
            alert('Failed to sign up for the newsletter. Please try again later.');
        }
    };


    return (
        <Container className="caregiver-dashboard">
            <h1 className="text-center my-4">Hello Caregivers!</h1>
            <Row className="text-center">
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Profile</Card.Title>
                            <Button variant="primary" className="m-2">Profile Picture</Button>
                            <Button variant="secondary" className="m-2">Bio</Button>
                            <Button variant="secondary" className="m-2">Relationship to CHEER Member</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Upcoming Events</Card.Title>
                            <Button variant="success" className="m-2">Newsletter</Button>
                            <Button variant="warning" className="m-2">Events of the Month</Button>
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
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Newsletter Signup</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
                                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">Sign up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Add a Client</Card.Title>
                            <Form onSubmit={handleClientSubmit}>
                                <Form.Group controlId="clientFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter client's first name" value={clientFirstName} onChange={handleClientInfoChange(setClientFirstName)} required />
                                </Form.Group>
                                <Form.Group controlId="clientLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter client's last name" value={clientLastName} onChange={handleClientInfoChange(setClientLastName)} required />
                                </Form.Group>
                                <Form.Group controlId="clientEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter client's email" value={clientEmail} onChange={handleClientInfoChange(setClientEmail)} required />
                                </Form.Group>
                                <Form.Group controlId="clientPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter client's phone number" value={clientPhoneNumber} onChange={handleClientInfoChange(setClientPhoneNumber)} required />
                                </Form.Group>
                                <Form.Group controlId="clientPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" placeholder="Enter client's password" value={clientPassword} onChange={handleClientInfoChange(setClientPassword)} required />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                                    {isLoading ? 'Registering...' : 'Add Client'}
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CaregiverPage;
