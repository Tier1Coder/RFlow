import React from 'react';

const DownloadFileIcon = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-2 -2 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g 
        id="Layer_1" 
        transform="translate(-2, -2.00000023841858)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="DesktopWindows">
          <path
            d="M28, 4L4, 4C2.9, 4 2, 4.9 2, 6L2, 20C2, 21.1 2.9, 22 4, 22L12, 22L12, 26L8, 26L8, 28L24, 28L24, 26L20, 26L20, 22L28, 22C29.1, 22 30, 21.1 30, 20L30, 6C30, 4.9 29.1, 4 28, 4zM28, 20L4, 20L4, 6L28, 6L28, 20z"
            style={{ fill: "#454545" }}
          />
        </g>
      </g>
      <g 
        id="Layer_1" 
        transform="translate(6, 0)" 
        style={{ enableBackground: "new 0 0 16 16" }}
      >
        <g id="Arrow1Down">
          <polygon 
            points="6,0 10,0 10,8 16,8 8,16 0,8 6,8" 
            style={{ fill: "#039C23" }} 
          />
        </g>
      </g>
    </svg>
  );
};

const DownloadFileIconButton = ({ width, height, onClick, label, className }) => {
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
        <DownloadFileIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
  };
  
  export {DownloadFileIconButton};
