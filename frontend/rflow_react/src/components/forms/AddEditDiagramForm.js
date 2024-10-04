import React from 'react';

const AddEditDiagramForm = ({ activeItem, originalItem, onChange }) => {
    return (
        <form>
            <div className="form-group">
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
            <div className="form-group">
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
                    <div 
                        className="current-file">Current file: 
                            <div
                                className="current-file-path">
                                    <a 
                                        href={originalItem.file} 
                                        target="_blank" 
                                        rel="noopener noreferrer">{originalItem.file}
                                    </a>
                            </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default AddEditDiagramForm;
