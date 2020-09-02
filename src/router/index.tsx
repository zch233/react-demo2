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
    title: '404',
  },
  {
    path: '/auth',
    component: SignLayout,
    routes: [
      {
        path: '/auth/sign_in',
        component: SignIn,
        exact: true,
        title: '第九区专利交易平台-登录',
      },
      {
        path: '/auth/sign_up',
        component: SignUp,
        exact: true,
        title: '第九区专利交易平台-注册',
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
        title: '第九区专利交易平台-首页',
      },
      {
        path: '/patent',
        component: Patent,
        exact: true,
        title: '第九区专利交易平台-专利列表',
      },
      {
        path: '/patent/:number',
        component: PatentDetail,
        exact: true,
        title: '第九区专利交易平台-专利详情',
      },
      {
        path: '/order/confirm',
        component: OrderConfirm,
        exact: true,
        title: '第九区专利交易平台-确认订单',
      },
      {
        path: '/order/pay/wechat',
        component: WechatPay,
        exact: true,
        title: '第九区专利交易平台-微信支付',
      },
      {
        path: '/order/pay/result',
        component: Result,
        exact: true,
        title: '第九区专利交易平台-支付结果',
      },
      {
        path: '/user',
        component: UserLayout,
        routes: [
          {
            path: '/user/order',
            component: Order,
            exact: true,
            title: '第九区专利交易平台-我的订单',
          },
          {
            path: '/user/preorder',
            component: Preorder,
            exact: true,
            title: '第九区专利交易平台-我的预定',
          },
          {
            path: '/user/vip',
            component: Vip,
            exact: true,
            title: '第九区专利交易平台-VIP会员',
          },
          {
            path: '/user/settings',
            component: Settings,
            exact: true,
            title: '第九区专利交易平台-个人设置',
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
      render={(props) => {
        document.title = route.title || '第九区专利交易平台';
        // pass the sub-routes down to keep nesting
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
}

export default routes;
