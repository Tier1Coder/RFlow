import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/components/modals/HelpModal.css';

/**
 * HelpModal Component
 * 
 * A modal component that provides information about the RFlow application.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.toggle - The function to call to toggle the modal visibility.
 */
const HelpModal = ({ isOpen, toggle }) => {
  return (
    <Modal show={isOpen} onHide={toggle} className="help-modal">
      <Modal.Header closeButton className="help-modal-header">
        <Modal.Title>About RFlow</Modal.Title>
      </Modal.Header>
      <Modal.Body className="help-modal-body">
        <h5>What is RFlow?</h5>
        <p>
          RFlow is a React-based web application that allows you to create and edit BPMN diagrams.
        </p>
        <h5>How does it work?</h5>
        <p>
          First, you create a new diagram instance. Then, you can upload an XML file representing your diagram, which will be validated. After uploading, the diagram can be visualized, allowing you to inspect and interact with its elements. You can also edit the diagram's details, download it for local storage, or delete it if it's no longer needed. The application provides a straightforward way to manage and visualize diagrams efficiently.
        </p>
        <h5>Author</h5>
        <p>
          This application was created by <a href="https://github.com/Tier1Coder">Tier1Coder</a>
        </p>
      </Modal.Body>
      <Modal.Footer className="help-modal-footer">
        <Button variant="secondary" onClick={toggle} className="help-modal-cancel-button">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;
