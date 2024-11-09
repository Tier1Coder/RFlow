import React from 'react';

const ShowHiddenElementsIcon = ({ width, height }) => {
  return (
    <svg 
      viewBox="-2 -8 32 32" 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
    >
      <g 
        id="Layer_1" 
        transform="translate(-2.00000095367432, -8.00000047683716)" 
        style={{ enableBackground: 'new 0 0 32 32' }}
      >
        <g id="Visibility">
          <circle cx="16" cy="16" r="4" style={{ fill: '#A1D1FF' }} />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-2, -8)" 
        style={{ enableBackground: 'new 0 0 32 32' }}
      >
        <g id="Visibility">
          <path 
            d="M16, 8C8, 8 2, 16 2, 16C2, 16 8, 24 16, 24C24, 24 30, 16 30, 16C30, 16 24, 8 16, 8zM16, 22C12.7, 22 10, 19.3 10, 16C10, 12.7 12.7, 10 16, 10C19.3, 10 22, 12.7 22, 16C22, 19.3 19.3, 22 16, 22z" 
            style={{ fill: '#83C2FC' }} 
          />
        </g>
      </g>
    </svg>
  );
};


const ShowHiddenElementsIconButton = ({ width, height, onClick, label, className }) => {
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
      <ShowHiddenElementsIcon width={width} height={height} />
      {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
    </button>
  );
};



export {ShowHiddenElementsIconButton};
