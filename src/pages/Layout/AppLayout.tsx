import React from 'react';
import { Layout } from 'antd';
import { Link, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';

const AppLayout: React.FC = ({ routes }: any) => {
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
          </ul>
        </nav>
      </Layout.Header>
      <Layout.Content>
        <Switch>
          {routes.map((route: any, i: any) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  );
};

export default AppLayout;
