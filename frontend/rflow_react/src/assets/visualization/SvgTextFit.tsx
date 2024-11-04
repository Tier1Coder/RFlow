import React from 'react';
import { Textfit } from 'react-textfit';

interface SvgTextFitProps {
  text: string;
  style?: React.CSSProperties;
}

const SvgTextFit: React.FC<SvgTextFitProps> = ({
  text,
  style,
}) => (
  <Textfit
    mode="multi"
    min={9}
    max={20}
    style={{
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      lineHeight: 1.1,
      ...style,
    }}
  >
    {text}
  </Textfit>
);

export default SvgTextFit;
