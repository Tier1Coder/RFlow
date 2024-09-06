const DeleteCircleIcon = ({ width, height }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g transform="translate(0, 0)">
          <g transform="matrix(1.14285719394684, 0, 0, 1.14285719394684, 0, 0)">
            <g transform="translate(0, 0)">
              <g transform="matrix(1.16666543483734, 0, 0, 1.16666543483734, 0, 0)">
                <g id="Layer_1" transform="translate(-4, -4)" style={{ enableBackground: "new 0 0 32 32" }}>
                  <g id="DeleteCircled">
                    <path
                      d="M16, 4C9.4, 4 4, 9.4 4, 16C4, 22.6 9.4, 28 16, 28C22.6, 28 28, 22.6 28, 16C28, 9.4 22.6, 4 16, 4zM23.1, 20.2L20.3, 23L16, 18.8L11.8, 23L9, 20.2L13.2, 16L9, 11.8L11.8, 9L16, 13.2L20.2, 9L23, 11.8L18.8, 16L23.1, 20.2z"
                      fill="#D11C1C"
                      className="Red"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  };
  


  const DeleteCircleIconButton = ({ width, height, onClick, label, className }) => {
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
        <DeleteCircleIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
  };

  export {DeleteCircleIconButton}