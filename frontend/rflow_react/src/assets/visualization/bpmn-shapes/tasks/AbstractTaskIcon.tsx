import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx'

interface AbstractTaskIconProps {
  name?: string;
}

const AbstractTaskIcon: React.FC<AbstractTaskIconProps> = ({name = ''}) => {
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        border: '1px solid black',
        borderRadius: '5px' }}>
      <SvgTextFit 
        text={name}
        style={{width: '100%', height: '100%', padding: '2px'}} />
    </div>
  );
};

export default AbstractTaskIcon;