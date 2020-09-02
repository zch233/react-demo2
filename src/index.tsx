import React, { useReducer } from 'react';
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
import { useScrollToTop } from './hooks/useScrollTop';
import ReturnTop from './components/ReturnTop';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { SlideContactConfig } = useSlideContact();
  useScrollToTop();
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
      {SlideContactConfig}
      <ReturnTop />
    </StoreContext.Provider>
  );
};
ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </React.Suspense>,
  document.getElementById('root')
);
