import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';

const SignLayout: React.FC = ({ routes }: any) => {
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
