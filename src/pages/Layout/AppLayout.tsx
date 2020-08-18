import React from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import { useRecoilValue } from 'recoil';
import { currentUserNameQuery } from '../../store';
import Header from './components/Header';
import Footer from './components/Footer';

interface Props {
  routes: RouteProps[];
}

const AppLayout: React.FC<Props> = ({ routes }) => {
  // const userNameLoadable = useRecoilValue(currentUserNameQuery);
  // console.log(userNameLoadable);
  return (
    <>
      <Header />
      <main>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
