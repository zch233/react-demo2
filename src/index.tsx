import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';
import './index.css';
import 'reset-css';
import routes, { RouteWithSubRoutes } from './router/index';

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
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
