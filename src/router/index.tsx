import React from 'react';
import AppLayout from '../pages/Layout/AppLayout';
import Home from '../pages/Home';
import Patent from '../pages/Patent';
import SignLayout from '../pages/Layout/SignLayout';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import { Route, RouteProps } from 'react-router-dom';

const routes = [
  {
    path: '/auth',
    component: SignLayout,
    routes: [
      {
        path: '/auth/sign_in',
        component: SignIn,
      },
      {
        path: '/auth/sign_up',
        component: SignUp,
      },
    ],
  },
  {
    path: '/',
    component: AppLayout,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
      },
      {
        path: '/patent',
        component: Patent,
      },
    ],
  },
];

interface TypeProps {
  path: string;
  component: React.FC<{}>;
  routes?: TypeProps[];
}

export function RouteWithSubRoutes(route: TypeProps) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default routes;
