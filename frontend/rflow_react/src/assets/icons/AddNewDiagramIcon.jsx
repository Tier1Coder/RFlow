import React from 'react';

const AddNewDiagramIcon = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g 
        id="Layer_1" 
        transform="translate(-2, 2)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Diagram">
          <polygon 
            points="12,14 6,14 6,20 8,20 8,16 14,16 14,12 12,12" 
            style={{ fill: "#727272" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-2, 2)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Diagram">
          <polygon 
            points="20,14 20,12 18,12 18,16 24,16 24,20 26,20 26,14" 
            style={{ fill: "#727272" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-2.00000095367432, 2)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Diagram">
          <path 
            d="M11, 12L21, 12C21.5, 12 22, 11.5 22, 11L22, 3C22, 2.5 21.5, 2 21, 2L11, 2C10.5, 2 10, 2.5 10, 3L10, 11C10, 11.5 10.5, 12 11, 12z" 
            style={{ fill: "#1177D7" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-2.00000190734863, 1.99999809265137)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Diagram">
          <path 
            d="M29, 20L19, 20C18.5, 20 18, 20.5 18, 21L18, 29C18, 29.5 18.5, 30 19, 30L29, 30C29.5, 30 30, 29.5 30, 29L30, 21C30, 20.5 29.5, 20 29, 20z" 
            style={{ fill: "#1177D7" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-2, 1.99999809265137)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Diagram">
          <path 
            d="M13, 20L3, 20C2.5, 20 2, 20.5 2, 21L2, 29C2, 29.5 2.5, 30 3, 30L13, 30C13.5, 30 14, 29.5 14, 29L14, 21C14, 20.5 13.5, 20 13, 20z" 
            style={{ fill: "#1177D7" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(16, -2)" 
        style={{ enableBackground: "new 0 0 16 16" }}
      >
        <g id="AddCircled">
          <circle 
            cx="9" 
            cy="9" 
            r="7" 
            style={{ fill: "#039C23" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(16, -2)" 
        style={{ enableBackground: "new 0 0 16 16" }}
      >
        <g id="AddCircled">
          <polygon 
            points="14,8 10,8 10,4 8,4 8,8 4,8 4,10 8,10 8,14 10,14 10,10 14,10" 
            style={{ fill: "#FFFFFF" }} 
          />
        </g>
      </g>
    </svg>
  );
};

const AddNewDiagramIconButton = ({ width, height, onClick, label, className }) => {
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
        <AddNewDiagramIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
  };
  
  export { AddNewDiagramIconButton };