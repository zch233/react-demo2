import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';

const Wrapper = styled.article`
  background-color: #fff;
  text-align: center;
  padding: 15px;
`;
const Detail: React.FC = () => {
  return (
    <Wrapper>
      <Tabs type="card">
        <Tabs.TabPane tab="交易流程" key="1">
          <img src={require('../../assert/patent/transactionProcess.jpg')} alt="" />
        </Tabs.TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default Detail;
