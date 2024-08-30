import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../../styles/InfoModal.css';

const InfoModal = ({ isOpen, toggle }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader className="custom-modal-header">
                About RFlow
            </ModalHeader>
            <ModalBody className="custom-modal-body">
                <h5>What is RFlow?</h5>
                <p>
                    RFlow is a React-based web application that allows you to create and edit BPMN diagrams.
                </p>
                <h5>How does it work?</h5>
                <p>
                    First, you create a new diagram instance. 
                    Then, you can upload an XML file representing your diagram, which will be validated. 
                    After uploading, the diagram can be visualized, allowing you to inspect and interact with its elements. 
                    You can also edit the diagram's details, download it for local storage, or delete it if it's no longer needed. 
                    The application provides a straightforward way to manage and visualize diagrams efficiently.
                </p>
                <h5>Author</h5>
                <p>
                    This application was created by <a href="https://github.com/Tier1Coder">Tier1Coder</a>
                </p>
            </ModalBody>
            <ModalFooter className="custom-modal-footer">
                <Button color="secondary" onClick={toggle} className="custom-cancel-button">
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default InfoModal;
