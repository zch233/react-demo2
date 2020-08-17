import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'reset-css';
import 'antd/dist/antd.css';
import './index.css';
import routes, { RouteWithSubRoutes } from './router/index';
import Index from './components/Loading/index';
import { RecoilRoot } from 'recoil';

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
  <React.Suspense fallback={<Index />}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.Suspense>,
  document.getElementById('root')
);
