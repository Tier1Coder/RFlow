import React from 'react';
import { AppLogoIcon } from '../assets/app/AppLogoIcon.jsx';
import '../styles/components/AppHeader.css';

/**
 * AppHeader component.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The buttons to be displayed in the header.
 */
const AppHeader = ({ children }) => {
    return (
        <div className="app-header">
            <div className="app-header-icons">
                <div className="app-header-logo">
                    <AppLogoIcon width="80" height="80" />
                </div>
                <div className="app-header-buttons">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
