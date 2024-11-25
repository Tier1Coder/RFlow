import React from 'react';

const ShowVisualizationIcon = ({ width, height }) => {
  return (
    <svg
      viewBox="-2 -4 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <g
        id="Layer_1"
        transform="translate(-2, -4)"
        style={{ enableBackground: 'new 0 0 32 32' }}
      >
        <g id="Find">
          <path
            d="M29.5, 19.7L29.5, 19.7L29.5, 19.7C29.5, 19.7 29.5, 19.7 29.5, 19.7L23.8, 6L23.8, 6C23.4, 4.8 22.3, 4 21, 4C19.3, 4 18, 5.3 18, 7L18, 10L14, 10L14, 7C14, 5.3 12.7, 4 11, 4C9.7, 4 8.6, 4.9 8.2, 6L8.2, 6L2.5, 19.7C2.5, 19.7 2.5, 19.7 2.5, 19.7L2.5, 19.7L2.5, 19.7C2.2, 20.4 2, 21.2 2, 22C2, 25.3 4.7, 28 8, 28C11.3, 28 14, 25.3 14, 22L14, 18L18, 18L18, 22C18, 25.3 20.7, 28 24, 28C27.3, 28 30, 25.3 30, 22C30, 21.2 29.8, 20.4 29.5, 19.7zM8, 26C5.8, 26 4, 24.2 4, 22C4, 19.8 5.8, 18 8, 18C10.2, 18 12, 19.8 12, 22C12, 24.2 10.2, 26 8, 26zM24, 26C21.8, 26 20, 24.2 20, 22C20, 19.8 21.8, 18 24, 18C26.2, 18 28, 19.8 28, 22C28, 24.2 26.2, 26 24, 26z"
            fill="#727272"
            style={{ fill: '#000000' }}
          />
        </g>
      </g>
    </svg>
  );
};


const ShowVisualizationIconButton = ({ width, height, onClick, label, className }) => {
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
      <ShowVisualizationIcon width={width} height={height} />
      {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
    </button>
  );
};



export {ShowVisualizationIconButton};
