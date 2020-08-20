import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Input } from 'antd';
import { Link } from 'react-router-dom';

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
    margin-bottom: 30px;
    font-size: 30px;
  }
  .input {
    margin-bottom: 15px;
  }
  .checkbox {
    margin-bottom: 10px;
    user-select: none;
  }
  .signUpButton {
    margin-bottom: 15px;
    background-color: #5cb85c;
    border-color: #4cae4c;
    color: #fff;
    &:hover {
      background-color: #449d44;
      border-color: #398439;
    }
  }
`;
const SignIn: React.FC = () => {
  const [referrerVisible, setReferrerVisible] = useState(false);
  return (
    <Wrapper>
      <h3>新用户注册</h3>
      <Input className={'input'} addonBefore="手机号" defaultValue="mysite" />
      <Input className={'input'} addonBefore="密　码" defaultValue="mysite" />
      <Input className={'input'} addonBefore="验证码" addonAfter={'获取'} defaultValue="mysite" />
      <Checkbox className={'checkbox'} onChange={(e) => setReferrerVisible(e.target.checked)}>
        填写推荐人
      </Checkbox>
      {referrerVisible && <Input className={'input'} addonBefore="推荐人" defaultValue="mysite" />}
      <Button className={'signUpButton'} block>
        注 册
      </Button>
      <Link to={'/auth/sign_up'}>已有账号，去登录</Link>
    </Wrapper>
  );
};

export default SignIn;
