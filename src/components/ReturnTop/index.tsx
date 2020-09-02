import React from 'react';
import { BackTop } from 'antd';
import AliIcon from '../AliIcon';
import styled from 'styled-components';

const shape = '40px';
const Content = styled.div`
  border-radius: 4px;
  background-color: #1088e9;
  font-size: 30px;
  width: ${shape};
  height: ${shape};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ReturnTop: React.FC = () => {
  return (
    <BackTop>
      <Content>
        <AliIcon icon={'returnTop'} />
      </Content>
    </BackTop>
  );
};

export default ReturnTop;
