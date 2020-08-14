import React from 'react';
import { Layout } from 'antd';
import { Link, RouteProps, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';

interface Props {
  routes: RouteProps[];
}

const AppLayout: React.FC<Props> = ({ routes }) => {
  return (
    <Layout>
      <Layout.Header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/patent">patent</Link>
            </li>
            <li>
              <Link to="/auth/sign_in">sign_in</Link>
            </li>
          </ul>
        </nav>
      </Layout.Header>
      <Layout.Content>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  );
};

export default AppLayout;
