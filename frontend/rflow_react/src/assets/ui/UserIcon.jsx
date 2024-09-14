import React from 'react';

const UserIcon = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-4 -2 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g 
        id="Layer_1" 
        transform="translate(-4.00000045776367, -2)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="User">
          <path 
            d="M10, 9.9C9.9, 10.4 10.2, 10.8 10.4, 11.3C10.6, 11.8 10.3, 13 11.3, 12.9C11.3, 12.9 11.3, 13 11.3, 13.1C11.9, 15.4 13.3, 18 16, 18C18.7, 18 20.2, 15.4 20.7, 13.1C20.7, 13.1 20.7, 13 20.7, 13C21.7, 13.1 21.3, 11.9 21.6, 11.4C21.8, 10.9 22, 10.5 21.9, 10C21.8, 9.6 21.5, 9.6 21.4, 9.7C23.2, 4.8 20.3, 5 20.3, 5C20.3, 5 20, 2 14.8, 2C10, 2 9.4, 6 10.5, 9.6C10.4, 9.6 10.1, 9.7 10, 9.9z" 
            fill="#727272" 
            style={{ fill: "#000000" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-4, -2.00000190734863)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="User">
          <path 
            d="M20, 18C19.2, 19.5 17.9, 22 16, 22C14.1, 22 12.8, 19.5 12, 18C9.7, 21.5 4, 19 4, 26.5L4, 30L28, 30L28, 26.5C28, 19.1 22.3, 21.4 20, 18z" 
            fill="#727272" 
            style={{ fill: "#000000" }} 
          />
        </g>
      </g>
    </svg>
  );
};

const UserIconButton = ({ width, height, onClick, label, className }) => {
    return (
      <button 
        onClick={onClick} 
        className={className} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '10px', 
          border: 'none', 
          background: 'none', 
          cursor: 'pointer' 
        }}
      >
        <UserIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
  };
  
export { UserIconButton };
