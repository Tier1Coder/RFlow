import React from 'react';

const ChooseSchemaIcon = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox="-4 -2 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <g id="Layer_1" transform="translate(-4, -2.00000011920929)" style={{ enableBackground: 'new 0 0 32 32' }}>
        <g id="Report">
          <path d="M27, 4L24, 4L24, 26L8, 26L8, 4L5, 4C4.4, 4 4, 4.4 4, 5L4, 29C4, 29.6 4.4, 30 5, 30L27, 30C27.6, 30 28, 29.6 28, 29L28, 5C28, 4.4 27.6, 4 27, 4z" fill="#FFB115" className="Yellow" />
        </g>
      </g>
      <g id="Layer_1" transform="translate(-4.00000095367432, -2)" style={{ enableBackground: 'new 0 0 32 32' }}>
        <g id="Report">
          <path d="M20, 4L20, 3C20, 2.4 19.6, 2 19, 2L13, 2C12.4, 2 12, 2.4 12, 3L12, 4L10, 4L10, 8L13, 8L19, 8L22, 8L22, 4L20, 4z" fill="#727272" style={{ fill: '#2B2B2B' }} />
        </g>
      </g>
      <g id="Layer_1" transform="translate(-4, -2)" style={{ enableBackground: 'new 0 0 32 32' }}>
        <g id="Report">
          <g className="st0">
            <rect x="10" y="20" width="12" height="2" fill="#727272" opacity="0.75" style={{ opacity: 1, fill: '#636363' }} />
          </g>
        </g>
      </g>
      <g id="Layer_1" transform="translate(-4, -2)" style={{ enableBackground: 'new 0 0 32 32' }}>
        <g id="Report">
          <g className="st0">
            <rect x="10" y="12" width="12" height="2" fill="#727272" opacity="0.75" style={{ opacity: 1, fill: '#636363' }} />
          </g>
        </g>
      </g>
      <g id="Layer_1" transform="translate(-4, -2)" style={{ enableBackground: 'new 0 0 32 32' }}>
        <g id="Report">
          <g className="st0">
            <rect x="10" y="16" width="12" height="2" fill="#727272" opacity="0.75" style={{ opacity: 1, fill: '#636363' }} />
          </g>
        </g>
      </g>
    </svg>
  );
};


const ChooseSchemaIconButton = ({ width, height, onClick, label, className }) => {
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
      <ChooseSchemaIcon width={width} height={height} />
      {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
    </button>
  );
};

export { ChooseSchemaIconButton };