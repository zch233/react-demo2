import React from 'react';
import styled from 'styled-components';
import LoginDialog from '../Layout/components/LoginDialog';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Wrapper = styled.section`
  background-color: #fff;
  padding: 30px 50px;
  border-radius: 4px;
  width: 400px;
  height: 80%;
  user-select: none;
  h3 {
    text-align: center;
    color: #00651d;
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 30px;
  }
  .loginWrapper {
    width: 100%;
  }
`;
const SignIn: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(queryString.parse(location.search));
  const signInSuccess = () => {
    const redirectURL = queryString.parse(location.search).redirect;
    history.push((redirectURL as string | undefined) || '/');
  };
  return (
    <Wrapper>
      <h3>登录</h3>
      <LoginDialog signInSuccess={signInSuccess} className={'loginWrapper'} />
    </Wrapper>
  );
};

export default SignIn;
