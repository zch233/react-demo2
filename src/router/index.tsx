import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../pages/Layout/AppLayout';
import Home from '../pages/Home';
import Patent from '../pages/Patent';
import SignLayout from '../pages/Layout/SignLayout';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import NoMatch from '../pages/ErrorPage/NoMatch';
import PatentDetail from '../pages/PatentDetail';
import OrderConfirm from '../pages/OrderConfirm';
import UserLayout from '../pages/Layout/UserLayout';
import Order from '../pages/Order';
import Vip from '../pages/Vip';
import Settings from '../pages/Settings';
import Preorder from '../pages/Preorder';
import WechatPay from '../pages/Pay/WechatPay';
import Result from '../pages/Pay/Result';

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
        path: '/patent/:number',
        component: PatentDetail,
        exact: true,
      },
      {
        path: '/order/confirm',
        component: OrderConfirm,
        exact: true,
      },
      {
        path: '/order/pay/wechat',
        component: WechatPay,
        exact: true,
      },
      {
        path: '/order/pay/result',
        component: Result,
        exact: true,
      },
      {
        path: '/user',
        component: UserLayout,
        routes: [
          {
            path: '/user/order',
            component: Order,
            exact: true,
          },
          {
            path: '/user/preorder',
            component: Preorder,
            exact: true,
          },
          {
            path: '/user/vip',
            component: Vip,
            exact: true,
          },
          {
            path: '/user/settings',
            component: Settings,
            exact: true,
          },
        ],
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
