import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import ModularHeader from './ModularHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import withAuth from './WithAuth';

const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}


const StaffPage = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo ? userInfo._id : null;
   
    console.log(userId);
    const [hours, setHours] = useState({
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
    });
    const [selectedWeek, setSelectedWeek] = useState(getMonday(new Date()));

    const handleChange = (event) => {
        setHours({
            ...hours,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedDate = selectedWeek.toISOString().split('T')[0];
        console.log("FORMATED"+formattedDate);
        console.log("USERID"+userId);
        fetch('/api/timesheets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId,
                weekOf: formattedDate,
                ...hours
            }),
        });
    };

    return (
        <div>
            <Row><br></br></Row>
            <Container style={{ maxWidth: '600px' }}>
                <ModularHeader title="Time Sheet"/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Week of</Form.Label>
                        <Row>
                            <Col sm="10">
                                <DatePicker selected={selectedWeek} onChange={date => setSelectedWeek(date)} dateFormat="MMMM d, yyyy" />
                            </Col>
                            <p>Please Select the <u>Monday</u> Of the current week.</p>
                        </Row>
                    </Form.Group>
                    {Object.entries(hours).map(([day, hours]) => (
                        <Form.Group as={Row} key={day}>
                            <Form.Label column sm="2">{day}</Form.Label>
                            <Col sm="10">
                                <Form.Control style={{ border: '1px solid gray' }} type="number" name={day} value={hours} onChange={handleChange} min="0" step="0.5" />
                                <br></br>
                            </Col>
                        </Form.Group>
                    ))}
                    <Button type="submit">Submit for Approval</Button>
                </Form>
            </Container>
        </div>
    );
};


export default withAuth(StaffPage, 'staff');