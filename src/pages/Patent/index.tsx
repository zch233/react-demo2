import React from 'react';
import styled from 'styled-components';
import FilterBar from './FilterBar';
import PatentList from './PatentList';

const Wrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px 0;
`;
const Patent: React.FC = () => {
  return (
    <Wrapper>
      <FilterBar />
      <PatentList />
    </Wrapper>
  );
};

export default Patent;
