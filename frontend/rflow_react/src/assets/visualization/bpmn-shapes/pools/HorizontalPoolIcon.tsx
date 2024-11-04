import React, { useEffect, useRef, useState } from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface HorizontalPoolIconProps {
  name?: string;
}

const HorizontalPoolIcon: React.FC<HorizontalPoolIconProps> = ({ name = '' }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [closestClass, setClosestClass] = useState<string>('');

  useEffect(() => {
    if (outerRef.current) {
      const outerRect = outerRef.current.getBoundingClientRect();

      const elements = document.querySelectorAll('.diagram-shape, .diagram-element-lane, .diagram-element-participant, .diagram-edge, .diagram-shape-horizontal-lane');

      let minDistance = outerRect.width; 
      let closestElementClass = '';

      elements.forEach((element) => {
        const elementRect = (element as HTMLElement).getBoundingClientRect();

        if (
          elementRect.top >= outerRect.top &&
          elementRect.bottom <= outerRect.bottom
        ) {
          const distance = elementRect.left - outerRect.left;
          if (distance > 0 && distance < minDistance) {
            minDistance = distance;
            closestElementClass = element.className;
          }
        }
      });

      setInnerWidth(minDistance);
      setClosestClass(closestElementClass);
    }
  }, []);

  return (
    <div
      ref={outerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '1px solid black',
        borderRadius: '2px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: closestClass === 'diagram-shape-horizontal-lane react-draggable' ? `${innerWidth}px` : `${innerWidth - 2}px`,
          minWidth: '14px',
          maxWidth: '20%',
          background: 'transparent',
          borderRight: '1px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SvgTextFit
          text={name}
          style={{
            writingMode: 'vertical-rl',
            textAlign: 'center',
            padding: '2px',
            whiteSpace: 'nowrap',
            rotate: '180deg',
          }}
        />
      </div>
    </div>
  );
};

export default HorizontalPoolIcon;