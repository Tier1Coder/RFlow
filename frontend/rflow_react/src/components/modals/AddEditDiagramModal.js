import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddEditDiagramForm from '../forms/AddEditDiagramForm';
import '../../styles/components/modals/AddEditDiagramModal.css';

const AddEditDiagramModal = ({
  modal,
  toggle,
  modalType,
  handleDiagramAdd,
  handleDiagramEdit,
  activeItem,
  originalItem,
  handleFormChange,
}) => {
  return (
    <Modal show={modal} onHide={toggle} className="custom-modal">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>
          {modalType === 'add' ? 'Add BPMN Diagram' : 'Edit BPMN Diagram'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <AddEditDiagramForm
          activeItem={activeItem}
          originalItem={originalItem}
          onChange={handleFormChange}
        />
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button
          variant="primary"
          onClick={() =>
            modalType === 'add'
              ? handleDiagramAdd(activeItem)
              : handleDiagramEdit(activeItem)
          }
          className="custom-save-button"
        >
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={toggle}
          className="custom-cancel-button"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditDiagramModal;
