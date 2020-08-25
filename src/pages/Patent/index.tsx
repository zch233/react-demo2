import React from 'react';
import styled from 'styled-components';
import FilterBar from './FilterBar';
import PatentList from './PatentList';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Wrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px 0;
`;
const Patent: React.FC = () => {
  const location = useLocation();
  console.log(queryString.parse(location.search));
  return (
    <Wrapper>
      <FilterBar />
      <PatentList />
    </Wrapper>
  );
};

export default Patent;
