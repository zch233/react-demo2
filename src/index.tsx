import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'reset-css';
import 'antd/dist/antd.css';
import './index.css';
import routes, { RouteWithSubRoutes } from './router/index';
import Loading from './components/Loading/index';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './utils/extends';
const App = () => (
  <Router>
    <div>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  </Router>
);
ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <RecoilRoot>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </RecoilRoot>
  </React.Suspense>,
  document.getElementById('root')
);
