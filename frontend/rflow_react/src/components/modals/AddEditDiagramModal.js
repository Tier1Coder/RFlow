import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddEditDiagramForm from '../forms/AddEditDiagramForm';
import '../../styles/components/modals/AddEditDiagramModal.css';

/**
 * AddEditDiagramModal Component
 * 
 * A modal component for adding or editing a BPMN diagram.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.modal - Whether the modal is visible.
 * @param {Function} props.toggle - The function to call to toggle the modal visibility.
 * @param {string} props.modalType - The type of the modal, either 'add' or 'edit'.
 * @param {Function} props.handleDiagramAdd - The function to call when adding a diagram.
 * @param {Function} props.handleDiagramEdit - The function to call when editing a diagram.
 * @param {Object} props.activeItem - The current state of the diagram being added or edited.
 * @param {Object} [props.originalItem] - The original state of the diagram being edited.
 * @param {Function} props.handleFormChange - The function to call when the form inputs change.
 */
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
  const handleSave = () => {
    if (modalType === 'add') {
      handleDiagramAdd(activeItem);
    } else {
      handleDiagramEdit(activeItem);
    }
  };

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
          onClick={handleSave}
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
