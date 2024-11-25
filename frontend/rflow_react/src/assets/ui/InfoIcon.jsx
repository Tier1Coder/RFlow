import React from 'react';

const InfoIcon = ({ width, height }) => {
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
        transform="translate(-2, -2)"
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Info">
          <path
            d="M16, 2C8.3, 2 2, 8.3 2, 16C2, 23.7 8.3, 30 16, 30C23.7, 30 30, 23.7 30, 16C30, 8.3 23.7, 2 16, 2zM16, 6C17.1, 6 18, 6.9 18, 8C18, 9.1 17.1, 10 16, 10C14.9, 10 14, 9.1 14, 8C14, 6.9 14.9, 6 16, 6zM20, 24L12, 24L12, 22L14, 22L14, 14L12, 14L12, 12L14, 12L18, 12L18, 22L20, 22L20, 24z"
            fill="#1177D7"
            className="Blue"
          />
        </g>
      </g>
    </svg>
  );
};

const InfoIconButton = ({ width, height, onClick, label, className }) => {
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
      <InfoIcon width={width} height={height} />
      {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
    </button>
  );
};

export { InfoIconButton };
