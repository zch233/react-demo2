import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`;
type Props = {
  icon: string;
};
const AliIcon: React.FC<Props> = ({ icon }) => {
  return (
    <Svg aria-hidden="true">
      <use xlinkHref={`#icon-${icon}`}></use>
    </Svg>
  );
};

export default AliIcon;
