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
        exact: true,
      },
      {
        path: '/auth/sign_up',
        component: SignUp,
        exact: true,
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
        exact: true,
      },
    ],
  },
];

export function RouteWithSubRoutes(route: RouteProps) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        // @ts-ignore
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default routes;
