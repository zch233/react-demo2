import React from 'react';
import { Layout } from 'antd';
import { Link, RouteProps, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import { useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { currentUserNameQuery, todoListState } from '../../store';

interface Props {
  routes: RouteProps[];
}

const AppLayout: React.FC<Props> = ({ routes }) => {
  // @ts-ignore
  const [userNameLoadable, setUserNameLoadable] = useRecoilStateLoadable(currentUserNameQuery);
  const text = useRecoilState(todoListState);
  const setText = useSetRecoilState(todoListState);
  console.log(userNameLoadable);
  return (
    <Layout>
      {text}
      <Layout.Header onClick={() => setText((old) => [...old, 1111])}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/patent">patent</Link>
            </li>
            <li>
              <Link to="/auth/sign_in">sign_in</Link>
            </li>
          </ul>
        </nav>
      </Layout.Header>
      <Layout.Content>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  );
};

export default AppLayout;
