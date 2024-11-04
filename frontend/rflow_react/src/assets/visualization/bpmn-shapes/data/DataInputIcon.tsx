import * as React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface DataInputIconProps {
  name?: string;
}

const DataInputIcon: React.FC<DataInputIconProps> = ({ name='' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'currentColor',
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path
            strokeDashoffset="200"
            strokeWidth="3%"
            d="M199.969 101.744v39.768H146.96v29.887h53.009v39.768l58.235-54.712z"
          />
          <path
            strokeWidth="4%"
            d="M109.561 63.224h198.676l82.203 84.412v289.141H109.561V63.224h188.621v92.912h92.257"
          />
        </g>
      </g>
    </svg>

    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 2px)',
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SvgTextFit
        text={name}
        style={{
          textAlign: 'center',
          padding: '2px',
          color: 'black',
        }}
      />
    </div>
  </div>
);

export default DataInputIcon;