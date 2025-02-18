import React from 'react';

const EditIcon = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-4 -4.025 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g 
        id="Layer_1" 
        transform="translate(-4.00000228881836, -4.025)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Edit">
          <path 
            d="M27.6, 8.2L23.8, 4.4C23.3, 3.9 22.4, 3.9 21.9, 4.4L19.4, 6.9L25.2, 12.7L27.7, 10.2C28.1, 9.6 28.1, 8.8 27.6, 8.2z" 
            fill="#1177D7" 
            className="Blue" 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-4, -4.02499885559082)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Edit">
          <polygon 
            points="4,28 9.8,28 4,22.2" 
            fill="#1177D7" 
            className="Blue" 
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(-3.99999988555908, -4.024999559021)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Edit">
          <rect 
            x="5.8" 
            y="13.4" 
            width="17.6" 
            height="8.2" 
            fill="#1177D7" 
            className="Blue" 
            transform="matrix(0.707, -0.7072, 0.7072, 0.707, -8.0721, 15.4048)" 
          />
        </g>
      </g>
    </svg>
  );
};


const EditIconButton = ({ width, height, onClick, label, className }) => {
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
        <EditIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
  };
  
  export { EditIconButton };