import React from 'react';
import '../../styles/components/modals/ResolutionToolShowErrorsModal.css';

const ResolutionToolShowErrorsModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="resolution-tool-show-errors-modal-container">
            <div className="resolution-tool-show-errors-modal-content">
                <span className="resolution-tool-show-errors-modal-close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default ResolutionToolShowErrorsModal;