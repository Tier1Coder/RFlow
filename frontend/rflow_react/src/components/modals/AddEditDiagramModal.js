import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import AddEditDiagramForm from '../forms/AddEditDiagramForm';
import '../../styles/AddEditDiagramModal.css';

const AddEditDiagramModal = ({ modal, toggle, modalType, handleDiagramAdd, handleDiagramEdit, activeItem, originalItem, handleFormChange }) => {
    return (
        modal && (
            <Modal isOpen={modal} toggle={toggle} className="custom-modal">
                <ModalHeader className="custom-modal-header">
                    {modalType === 'add' ? "Add BPMN Diagram" : "Edit BPMN Diagram"}
                </ModalHeader>
                <ModalBody className="custom-modal-body">
                    <AddEditDiagramForm activeItem={activeItem} originalItem={originalItem} onChange={handleFormChange} />
                </ModalBody>
                <ModalFooter className="custom-modal-footer">
                    <Button onClick={() => modalType === 'add' ? handleDiagramAdd(activeItem) : handleDiagramEdit(activeItem)} className="custom-save-button">
                        Save
                    </Button>
                    <Button onClick={toggle} className="custom-cancel-button">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    );
};

export default AddEditDiagramModal;
