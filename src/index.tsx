import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'reset-css';
import 'antd/dist/antd.css';
import './index.css';
import routes, { RouteWithSubRoutes } from './router/index';
import Loading from './components/Loading';
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
  <React.StrictMode>
    <React.Suspense fallback={<Loading />}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
