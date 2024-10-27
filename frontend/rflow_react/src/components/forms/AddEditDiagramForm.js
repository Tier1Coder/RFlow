import React from 'react';
import '../../styles/components/forms/AddEditDiagramForm.css';

/**
 * AddEditDiagramForm Component
 * 
 * A form component for adding or editing a diagram.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.activeItem - The current state of the diagram being added or edited.
 * @param {string} props.activeItem.name - The name of the diagram.
 * @param {File|string} [props.activeItem.file] - The file associated with the diagram.
 * @param {Object} [props.originalItem] - The original state of the diagram being edited.
 * @param {string} [props.originalItem.file] - The original file associated with the diagram.
 * @param {Function} props.onChange - The function to call when the form inputs change.
 */
const AddEditDiagramForm = ({ activeItem, originalItem, onChange }) => {
    return (
        <form>
            <div className="add-edit-diagram-form-group">
                <label htmlFor="name">Name</label>
                <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Diagram Name"
                    value={activeItem.name || ''}
                    onChange={onChange}
                />
            </div>
            <div className="add-edit-diagram-form-group">
                <label htmlFor="file">File</label>
                <input
                    id="file"
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={onChange}
                    accept=".xml"
                />
                {originalItem && originalItem.file && typeof originalItem.file === 'string' && (
                    <div className="add-edit-diagram-form-current-file">
                        Current file: 
                        <div className="add-edit-diagram-form-current-file-path">
                            <a 
                                href={originalItem.file} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                {originalItem.file}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default AddEditDiagramForm;
