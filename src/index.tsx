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
type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};
type State = {
  user: Partial<User>;
};
type Action = { type: 'setUser'; payload: Partial<User> };

const initialState = {
  user: {},
};
const reducer = (state: State, { type, payload }: Action) => {
  const map = {
    setUser: () => ({ ...state, user: payload }),
  };
  return map[type]();
};
export const StoreContext = React.createContext<Context>({ state: initialState, dispatch: () => {} });
const App = () => {
  // @ts-ignore
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
