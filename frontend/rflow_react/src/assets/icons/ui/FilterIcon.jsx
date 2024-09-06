import React from 'react';

const FilterIcon = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-6 -4 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g 
        id="Layer_1" 
        transform="translate(-6, -4)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Filter">
          <polygon 
            points="6,4 26,4 26,8 18,16 18,24 14,28 14,16 6,8" 
            fill="#FFB115" 
            style={{ fill: "#000000" }} 
          />
        </g>
      </g>
    </svg>
  );
};

const FilterIconButton = ({ width, height, onClick, label, className }) => {
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
        <FilterIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
  };
  
  export { FilterIconButton };
