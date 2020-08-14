import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loading: React.FC = () => {
  return (
    <Wrapper>
      <Spin />
    </Wrapper>
  );
};

export default Loading;
