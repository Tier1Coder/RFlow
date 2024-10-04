import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ isOpen, toggle, onConfirm, message }) => {
  return (
    <Modal show={isOpen} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={toggle}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
