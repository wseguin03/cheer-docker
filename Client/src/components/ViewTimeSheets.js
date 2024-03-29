import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {Container, Row, Col, Button, Alert} from 'react-bootstrap';
import ModularHeader from './ModularHeader';
import ConfirmModal from './ConfirmModal'; // Import the ConfirmModal component

const ViewTimeSheets = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [weekOf, setWeekOf] = useState('');
    let fetchTimesheets = async () => {};
    const getMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is Sunday
        return new Date(d.setDate(diff));
    }

    useEffect(() => {
        const monday = getMonday(new Date());
        setWeekOf(monday.toISOString().split('T')[0]);
    }, []);
   

    fetchTimesheets = async () => {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            try {
                console.log(weekOf);

                const response = await axios.get(`/api/timesheets?weekOf=${weekOf}T00:00:00.000Z`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTimesheets(response.data);
            } catch (err) {
                console.error(err);
            }
        };

    useEffect(() => {
        fetchTimesheets();
    }, []);
    useEffect(() => {
        fetchTimesheets();
    }, [weekOf]);
    const [message, setMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    // const deleteTimesheet = async (id) => {
    //     const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    //     try {
    //         if (window.confirm('Are you sure you want to delete this timesheet?')) {
    //             await axios.delete(`/api/timesheets/${id}`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             });
    //             // Refresh timesheets after deleting
    //             fetchTimesheets();
    //             setDeleteMessage('Timesheet Deleted');
    //             setTimeout(() => setDeleteMessage(""), 3000);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const [showConfirm, setShowConfirm] = useState(false);
const [timesheetToDelete, setTimesheetToDelete] = useState(null);

const handleDelete = (id) => {
    setTimesheetToDelete(id);
    setShowConfirm(true);
};

const handleClose = () => {
    setShowConfirm(false);
};

const handleConfirm = async () => {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    try {
        await axios.delete(`/api/timesheets/${timesheetToDelete}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Refresh timesheets after deleting
        fetchTimesheets();
        setDeleteMessage('Timesheet Deleted');
        setTimeout(() => setDeleteMessage(""), 3000);
    } catch (err) {
        console.error(err);
    }
    setShowConfirm(false);
};


const approveTimesheet = async (id) => {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    try {
        await axios.put(`/api/timesheets/${id}`, { approved: true }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Refresh timesheets after approving
        fetchTimesheets();
        setMessage('Timesheet approved');
        setTimeout(() => setMessage(""), 3000);
    } catch (err) {
        console.error(err);
        setMessage('');
    }
};

    return (
        <Container>
            <Row>
                <Row><br></br></Row>
                <ModularHeader title="View Submitted Timesheets Sheets" />
                <h5>Please select the <b>Monday</b> of the desired week</h5>
                <input type="date" value={weekOf} onChange={e => setWeekOf(e.target.value)} />
                <Row><br></br></Row>
                {deleteMessage && <Alert variant='danger'>{deleteMessage}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
    
                {timesheets.map(timesheet => (
                    <Col sm={12} md={6} lg={4} key={timesheet._id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{timesheet.firstName} {timesheet.lastName}</Card.Title>
                                <Card.Title>{timesheet.email}</Card.Title>
                                <Card.Text>Week of: {weekOf}</Card.Text>
                                <Card.Text><b>Hours:</b> </Card.Text>
                                <Card.Text>Monday: {timesheet.Monday}</Card.Text>
                                <Card.Text>Tuesday: {timesheet.Tuesday}</Card.Text>
                                <Card.Text>Wednesday: {timesheet.Wednesday}</Card.Text>
                                <Card.Text>Thursday: {timesheet.Thursday}</Card.Text>
                                <Card.Text>Friday: {timesheet.Friday}</Card.Text>
                                <Card.Text>Saturday: {timesheet.Saturday}</Card.Text>
                                <Card.Text>Sunday: {timesheet.Sunday}</Card.Text>
                                <Card.Text>Approved: {timesheet.approved ? 'Yes' : 'No'}</Card.Text>
    
                                <Row>
                                    <Col><Button variant="primary" onClick={() => approveTimesheet(timesheet._id)}>Approve</Button></Col>
                                    <Col><Button variant="danger" onClick={() => handleDelete(timesheet._id)}>Reject</Button></Col>
                                </Row>
    
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ConfirmModal show={showConfirm} handleClose={handleClose} handleConfirm={handleConfirm} />
        </Container>
    );

};

export default ViewTimeSheets;
