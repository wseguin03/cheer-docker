import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserInfoModal = ({ show, handleClose, users, title }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} style={{ marginBottom: "10px" }}>
              <h5>{user.firstName} {user.lastName}</h5>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfoModal;
