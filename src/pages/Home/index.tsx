import React from 'react';
import Banner from './Banner';
import List from './List';
import styled from 'styled-components';
import WebSiteDes from './WebSiteDes';
import categories from '../../utils/categories';

const HomeWrapper = styled.section`
  background-color: #fff;
`;
const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <Banner />
      {categories.map((category) => (
        <List key={category.code} title={category.name} category={category.code} />
      ))}
      <WebSiteDes />
    </HomeWrapper>
  );
};

export default Home;
