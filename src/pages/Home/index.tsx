import React from 'react';
import Banner from './Banner';
import List from './List';
import styled from 'styled-components';

const HomeWrapper = styled.section`
  background-color: #fff;
`;
const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <Banner />
      <List title={'最近上新'} category={'a'} />
      <List title={'最近上新'} category={'a'} />
      <List title={'最近上新'} category={'a'} />
    </HomeWrapper>
  );
};

export default Home;
