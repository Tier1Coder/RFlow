import React from 'react';

const AddEditDiagramForm = ({ activeItem, originalItem, onChange }) => {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Diagram Name"
                    value={activeItem.name || ''}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="file">File</label>
                <input
                    type="file"
                    className="form-control"
                    id="file"
                    name="file"
                    onChange={onChange}
                    accept=".xml"
                />
                {originalItem && originalItem.file && typeof originalItem.file === 'string' && (
                    <div>Current file: <a href={originalItem.file} target="_blank" rel="noopener noreferrer">{originalItem.file}</a></div>
                )}
            </div>
        </form>
    );
};

export default AddEditDiagramForm;
