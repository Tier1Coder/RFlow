import React from 'react';

interface IntermediateCatchEventIconProps {
  eventType: 'message' | 'timer' | 'none' | 'conditional' | 'link' | 'signal' | 'multiple' | 'parallelMultiple';
  width?: number;
  height?: number;
}

const IntermediateCatchEventIcon: React.FC<IntermediateCatchEventIconProps> = ({ eventType, width = 32, height = 32 }) => {
  const renderIcon = () => {
    switch (eventType) {
      case 'message':
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="8,14 16,18 24,14 16,10" fill="currentColor" />
          </circle>
        );
      case 'timer':
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16,6 L16,16 L20,18" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
          </circle>
        );
      case 'conditional':
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 10 L22 10 L16 20 Z" fill="currentColor" />
          </circle>
        );
      case 'link':
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 16 L22 16 M16 10 L16 22" stroke="currentColor" strokeWidth="2" />
          </circle>
        );
      case 'signal':
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="16,10 20,20 12,20" fill="currentColor" />
          </circle>
        );
      case 'multiple':
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="16,6 22,18 10,18" fill="currentColor" />
            <polygon points="12,14 20,14 16,22" fill="currentColor" />
          </circle>
        );
      case 'parallelMultiple':
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="10" y="10" width="4" height="12" fill="currentColor" />
            <rect x="18" y="10" width="4" height="12" fill="currentColor" />
          </circle>
        );
      case 'none':
      default:
        return (
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
        );
    }
  };

  return (
    <svg width={width} height={height} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      {renderIcon()}
    </svg>
  );
};

export default IntermediateCatchEventIcon;
