import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx'

interface TextAnnotationIconProps {
  text?: string;
}

const TextAnnotationIcon: React.FC<TextAnnotationIconProps> = ({ text='' }) => {
  return (
      <div 
      style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%',
        borderTop: '2px solid black',
        borderBottom: '2px solid black',
        borderLeft: '2px solid black'
        }}>
      <SvgTextFit 
        text={text}
        style={{width: '100%', height: '100%', padding: '2px'}} />
    </div>
  );
};

export default TextAnnotationIcon;
