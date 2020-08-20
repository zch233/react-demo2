import React from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import Header from './components/Header';
import Footer from './components/Footer';

interface Props {
  routes: RouteProps[];
}

const AppLayout: React.FC<Props> = ({ routes }) => {
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
