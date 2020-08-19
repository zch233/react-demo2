import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const Wrapper = styled.section`
  background-color: #fff;
  padding: 30px 50px;
  border-radius: 4px;
  width: 400px;
`;
const SignIn: React.FC = () => {
  return (
    <Wrapper>
      <h3>新用户注册</h3>
      <Input className={'input'} addonBefore="手机号" defaultValue="mysite" />
      <Input className={'input'} addonBefore="密　码" defaultValue="mysite" />
      <Input className={'input'} addonBefore="验证码" defaultValue="mysite" />
    </Wrapper>
  );
};

export default SignIn;
