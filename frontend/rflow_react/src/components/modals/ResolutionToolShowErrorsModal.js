import React from 'react';
import '../../styles/components/modals/ResolutionToolShowErrorsModal.css';

const ResolutionToolShowErrorsModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="resolution-tool-modal">
            <div className="resolution-tool-modal-content">
                <span className="resolution-tool-close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default ResolutionToolShowErrorsModal;