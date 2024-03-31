import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const AddStaffMember = () => {
    const [staffFirstName, setStaffFirstName] = useState('');
    const [staffLastName, setStaffLastName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffPhoneNumber, setStaffPhoneNumber] = useState('');
    const [staffPassword, setStaffPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleStaffSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: staffFirstName,
                    lastName: staffLastName,
                    email: staffEmail,
                    phoneNumber: staffPhoneNumber,
                    password: staffPassword,
                    userType: 'staff', // Ensure userType is set to 'staff' for automatic approval
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred during staff registration.');
            }

            alert('Staff registration successful!');
            setStaffFirstName('');
            setStaffLastName('');
            setStaffEmail('');
            setStaffPhoneNumber('');
            setStaffPassword('');
        } catch (error) {
            alert(error.message || 'Failed to register staff member.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Add Staff Member</Card.Title>
                            <Form onSubmit={handleStaffSubmit}>
                                <Form.Group controlId="staffFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter staff's first name"
                                        value={staffFirstName}
                                        onChange={(e) => setStaffFirstName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="staffLastName" className="mt-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter staff's last name"
                                        value={staffLastName}
                                        onChange={(e) => setStaffLastName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="staffEmail" className="mt-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter staff's email"
                                        value={staffEmail}
                                        onChange={(e) => setStaffEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="staffPhoneNumber" className="mt-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter staff's phone number"
                                        value={staffPhoneNumber}
                                        onChange={(e) => setStaffPhoneNumber(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="staffPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter staff's password"
                                        value={staffPassword}
                                        onChange={(e) => setStaffPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mt-4" disabled={isLoading}>
                                    {isLoading ? 'Registering...' : 'Add Staff Member'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddStaffMember;
