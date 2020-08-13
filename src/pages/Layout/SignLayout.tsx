import React from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import { currentUserNameQuery, todoListState } from '../../store';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

interface Props {
  routes: RouteProps[];
}

const SignLayout: React.FC<Props> = ({ routes }) => {
  const userNameLoadable = useRecoilValueLoadable(currentUserNameQuery);
  const [text, setText] = useRecoilState(todoListState);
  return (
    <div>
      {JSON.stringify(text)}
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default SignLayout;
