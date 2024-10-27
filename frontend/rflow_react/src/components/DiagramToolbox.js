// components/DiagramToolbox.js

import React from 'react';

/* UI Components */
import { InfoIconButton } from '../assets/ui/InfoIcon.jsx';
import { DownloadFileIconButton } from '../assets/ui/DownloadFileIcon.jsx';
import { DeleteCircleIconButton } from '../assets/ui/DeleteCircleIcon.jsx';

/* Styles */
import '../styles/components/DiagramToolbox.css';

/**
 * DiagramToolbox Component
 * 
 * Renders the toolbox with Info, Download, and Delete buttons.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.onInfo - Handler for Info button.
 * @param {Function} props.onDownload - Handler for Download button.
 * @param {Function} props.onDelete - Handler for Delete button.
 */
const DiagramToolbox = ({ onInfo, onDownload, onDelete }) => (
    <div className="diagram-toolbox">
        <InfoIconButton
            width="40"
            height="40"
            onClick={onInfo}
            className="diagram-toolbox-icon"
        />
        <DownloadFileIconButton
            width="40"
            height="40"
            onClick={onDownload}
            className="diagram-toolbox-icon"
        />
        <DeleteCircleIconButton
            width="40"
            height="40"
            onClick={onDelete}
            className="diagram-toolbox-icon"
        />
    </div>
);

export default DiagramToolbox;
