import React from 'react';
import { Button, Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { LoginDialogWrapper } from './HeaderStyles';

const LoginDialog: React.FC = () => {
  return (
    <LoginDialogWrapper>
      <Tabs type="card" size="small">
        <Tabs.TabPane tab="密码登录" key="passwordLogin">
          <Input className={'input'} addonBefore="手机号" defaultValue="mysite" />
          <Input className={'input'} addonBefore="密　码" defaultValue="mysite" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="手机验证码登录" key="captchaLogin">
          <Input className={'input'} addonBefore="手机号" defaultValue="mysite" />
          <Input className={'input'} addonBefore="验证码" addonAfter="获取" defaultValue="mysite" />
        </Tabs.TabPane>
      </Tabs>
      <Button className={'loginButton'} block>
        登录
      </Button>
      <Link className={'toSignIn'} to="/auth/sign_in">
        新用户注册
      </Link>
    </LoginDialogWrapper>
  );
};

export default LoginDialog;
