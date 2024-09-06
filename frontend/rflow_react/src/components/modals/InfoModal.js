import React from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/InfoModal.css';

const InfoModal = ({ isOpen, toggle, diagramData }) => {
    return (
        <Modal isOpen={isOpen} size="xl">
            <ModalHeader>Parsed diagram data
                <Button className="close-button" color="secondary" onClick={toggle}>Close</Button>
            </ModalHeader>
            <ModalBody>
                <pre className="diagram-data">
                    {JSON.stringify(diagramData, null, 2)}
                </pre>
            </ModalBody>
        </Modal>
    );
};

export default InfoModal;
