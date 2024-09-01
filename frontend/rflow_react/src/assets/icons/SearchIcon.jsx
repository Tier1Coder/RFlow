import React from 'react';

const SearchIcon = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-4 -4 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g 
        id="Layer_1" 
        transform="translate(-4, -4)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Zoom">
          <path 
            d="M27.7, 25.3L20.5, 18C21.5, 16.6 22, 14.8 22, 13C22, 8 18, 4 13, 4C8, 4 4, 8 4, 13C4, 18 8, 22 13, 22C14.9, 22 16.6, 21.4 18, 20.5L25.3, 27.8C25.6, 28.1 26.2, 28.1 26.5, 27.8L27.7, 26.6C28.1, 26.2 28.1, 25.6 27.7, 25.3zM6, 13C6, 9.1 9.1, 6 13, 6C16.9, 6 20, 9.1 20, 13C20, 16.9 16.9, 20 13, 20C9.1, 20 6, 16.9 6, 13z" 
            fill="#727272" 
            style={{ fill: "#000000" }} 
          />
        </g>
      </g>
    </svg>
  );
};

const SearchIconButton = ({ width, height, onClick, label, className }) => {
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
        <SearchIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
  };
  
export { SearchIconButton };
