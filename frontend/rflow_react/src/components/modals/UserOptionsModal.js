import React from 'react';
import '../../styles/components/modals/UserOptionsModal.css';

/**
 * UserOptionsModal Component
 * 
 * A modal component that provides user options such as logout.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.toggle - The function to call to toggle the modal visibility.
 * @param {Function} props.handleLogout - The function to call when the user logs out.
 */
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
