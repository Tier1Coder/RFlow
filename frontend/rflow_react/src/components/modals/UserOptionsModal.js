import React from 'react';
import '../../styles/components/modals/UserOptionsModal.css';

const UserOptionsModal = ({ isOpen, toggle, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="user-options-modal-overlay" onClick={toggle}>
      <div className="user-options-modal" onClick={(e) => e.stopPropagation()}>
        <h2>User Options</h2>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
};

export default UserOptionsModal;
