import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmationModal = ({ isOpen, toggle, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} >
            <ModalHeader>Confirm Action</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={onConfirm}>Confirm</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationModal;
