import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface UserTaskIconProps {
  name?: string;
}

const UserTaskIcon: React.FC<UserTaskIconProps> = ({
  name = ''
}) => {
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '2px',
        boxSizing: 'border-box'
      }}>

      {/* User Icon */}
      <div style={{ 
        position: 'absolute',
        top: '2px',
        left: '2px',
        width: 'auto',
        height: '20%', 
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 32 32"
          preserveAspectRatio='xMidYMid meet'
          style={{
            display: 'block',
          }}
        >
          <style>{`.st1{fill:#333}`}</style>
          <path className="st1" d="M25.838 31H6.162a3.957 3.957 0 0 1-3.245-1.661 3.956 3.956 0 0 1-.549-3.604l.704-2.113a6.034 6.034 0 0 1 4.966-4.059C10.131 19.307 13.211 19 16 19c2.788 0 5.869.307 7.963.563a6.032 6.032 0 0 1 4.965 4.059l.704 2.113a3.954 3.954 0 0 1-.55 3.604A3.955 3.955 0 0 1 25.838 31zM16 21c-2.688 0-5.681.298-7.718.549a4.02 4.02 0 0 0-3.312 2.706l-.704 2.112c-.206.618-.106 1.274.274 1.802S5.511 29 6.162 29h19.676a1.98 1.98 0 0 0 1.622-.83c.381-.528.48-1.185.275-1.803l-.704-2.112a4.02 4.02 0 0 0-3.312-2.706C21.681 21.298 18.687 21 16 21zM16 18c-4.687 0-8.5-3.813-8.5-8.5S11.313 1 16 1c4.687 0 8.5 3.813 8.5 8.5S20.687 18 16 18zm0-15c-3.584 0-6.5 2.916-6.5 6.5S12.416 16 16 16s6.5-2.916 6.5-6.5S19.584 3 16 3z"/>
          
        </svg>
      </div>
      <SvgTextFit 
        text={name}
        style={{
          position: 'absolute',
          top: 'calc(20% + 2px)',
          left: '2px',
          right: '2px',
          bottom: '2px',
          padding: '2px',
          boxSizing: 'border-box'
        }} 
      />
    </div>
  );
};

export default UserTaskIcon;