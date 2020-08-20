import React from 'react';
import styled from 'styled-components';
import Steps from './Steps';
const Wrapper = styled.section`
  background-color: #f5f5f5;
  padding: 10px 0;
`;
const OrderConfirm: React.FC = () => {
  return (
    <Wrapper>
      <Steps />
    </Wrapper>
  );
};

export default OrderConfirm;
