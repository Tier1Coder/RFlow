import React from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * ConfirmationModal Component
 * 
 * A modal component for confirming an action.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.toggle - The function to call to toggle the modal visibility.
 * @param {Function} props.onConfirm - The function to call when the action is confirmed.
 * @param {string} props.message - The message to display in the modal body.
 */
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
