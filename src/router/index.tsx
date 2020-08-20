import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../pages/Layout/AppLayout';
import Home from '../pages/Home';
import Patent from '../pages/Patent';
import SignLayout from '../pages/Layout/SignLayout';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import NoMatch from '../pages/NoMatch';
import PatentDetail from '../pages/PatentDetail';
import OrderConfirm from '../pages/OrderConfirm';

const routes = [
  {
    path: '/404',
    component: NoMatch,
  },
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
      {
        path: '/patent/:id',
        component: PatentDetail,
        exact: true,
      },
      {
        path: '/order/confirm',
        component: OrderConfirm,
        exact: true,
      },
    ],
  },
];

export function RouteWithSubRoutes(route: any) {
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
