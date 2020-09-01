import React, { Dispatch, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'reset-css';
import 'antd/dist/antd.css';
import './index.css';
import routes, { RouteWithSubRoutes } from './router/index';
import Loading from './components/Loading/index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './utils/extends';
import useSlideContact from './hooks/useSlideContact';
import { initialState, reducer, StoreContext } from './store';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { SlideContactConfig } = useSlideContact();
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
        {SlideContactConfig}
      </Router>
    </StoreContext.Provider>
  );
};
ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.Suspense>,
  document.getElementById('root')
);
