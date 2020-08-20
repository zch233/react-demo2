import React from 'react';
import styled from 'styled-components';
import Steps from './Steps';
import PatentCard from './PatentCard';
import RemarkCard from './RemarkCard';
import PayCard from './PayCard';

const Wrapper = styled.section`
  background-color: #f5f5f5;
  padding: 24px 0;
`;
const Main = styled.section`
  display: flex;
  margin-top: 15px;
  .leftBar {
    flex: 1;
    margin-right: 15px;
  }
  .rightBar {
    width: 30%;
  }
`;
const OrderConfirm: React.FC = () => {
  return (
    <Wrapper>
      <Steps />
      <Main className={'pageWidthWithCenter'}>
        <div className={'leftBar'}>
          <PatentCard />
          <RemarkCard />
        </div>
        <div className={'rightBar'}>
          <PayCard />
        </div>
      </Main>
    </Wrapper>
  );
};

export default OrderConfirm;
