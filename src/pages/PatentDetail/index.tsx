import React from 'react';
import styled from 'styled-components';
import Detail from './Detail';
import Patent from './Patent';
const Wrapper = styled.section`
  background-color: #f5f5f5;
  padding: 15px 0;
`;
const PatentDetail: React.FC = () => {
  return (
    <Wrapper>
      <Patent />
      <Detail />
    </Wrapper>
  );
};

export default PatentDetail;
