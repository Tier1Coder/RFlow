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
    <Modal show={modal} onHide={toggle} className="add-edit-diagram-modal">
      <Modal.Header closeButton className="add-edit-diagram-modal-header">
        <Modal.Title>
          {modalType === 'add' ? 'Add BPMN Diagram' : 'Edit BPMN Diagram'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-edit-diagram-modal-body">
        <AddEditDiagramForm
          activeItem={activeItem}
          originalItem={originalItem}
          onChange={handleFormChange}
        />
      </Modal.Body>
      <Modal.Footer className="add-edit-diagram-modal-footer">
        <Button
          variant="primary"
          onClick={() =>
            modalType === 'add'
              ? handleDiagramAdd(activeItem)
              : handleDiagramEdit(activeItem)
          }
          className="add-edit-diagram-modal-save-button"
        >
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={toggle}
          className="add-edit-diagram-modal-cancel-button"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditDiagramModal;