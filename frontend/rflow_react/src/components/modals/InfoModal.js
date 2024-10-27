import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/components/modals/InfoModal.css';

/**
 * InfoModal Component
 * 
 * A modal component that displays parsed diagram data.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.toggle - The function to call to toggle the modal visibility.
 * @param {Object} props.diagramData - The parsed diagram data to display.
 */
const InfoModal = ({ isOpen, toggle, diagramData }) => {
  return (
    <Modal show={isOpen} onHide={toggle} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Parsed Diagram Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre className="info-modal-diagram-data">
          {JSON.stringify(diagramData, null, 2)}
        </pre>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModal;
