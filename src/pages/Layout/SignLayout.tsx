import React from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';

interface Props {
  routes: RouteProps[];
}

const SignLayout: React.FC<Props> = ({ routes }) => {
  return (
    <div>
      <Switch>
        {routes.map((route: any, i: any) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default SignLayout;
