import React from 'react';
import { AppLogoIcon } from '../assets/app/AppLogoIcon.jsx';
import '../styles/components/AppHeader.css';

/**
 * AppHeader component.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode|React.ReactElement} props.children - The buttons to be displayed in the header.
 * @param {string} props.logoWidth - The width of the logo.
 * @param {string} props.logoHeight - The height of the logo.
 */
const AppHeader = ({ children, logoWidth = "80", logoHeight = "80" }) => {
    return (
        <div className="app-header">
            <div className="app-header-icons">
                <div className="app-header-logo">
                    <AppLogoIcon width={logoWidth} height={logoHeight} />
                </div>
                <div className="app-header-buttons">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
