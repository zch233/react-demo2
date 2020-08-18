import React from 'react';
import FilterBar from './FilterBar';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px 0;
`;
const Patent: React.FC = () => {
  return (
    <Wrapper>
      <FilterBar />
    </Wrapper>
  );
};

export default Patent;
