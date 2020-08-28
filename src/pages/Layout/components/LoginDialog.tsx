import React, { useCallback, useContext, useState } from 'react';
import { Button, Input, message, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { LoginDialogWrapper } from './HeaderStyles';
import * as api from '../../SignIn/api';
import { getUser } from '../../../api/base';
import useCaptcha from '../../../hooks/useCaptcha';
import { StoreContext } from '../../../index';

type Props = {
  className?: string;
  signInSuccess?: () => void;
  setPopoverVisible?: (value: boolean) => void;
};
type ActiveTabKey = 'signInWithPassword' | 'signInWithCaptcha';
const LoginDialog: React.FC<Props> = ({ className, signInSuccess, setPopoverVisible }) => {
  const { dispatch } = useContext(StoreContext);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<ActiveTabKey>('signInWithPassword');
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    captcha: '',
  });
  const handleInputChange = useCallback(
    (key: string, event: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({
        ...formData,
        [key]: event.target.value,
      }),
    [formData]
  );
  const signIn = useCallback(async () => {
    setSubmitLoading(true);
    await api[activeTabKey](formData);
    const { data } = await getUser().finally(() => setSubmitLoading(false));
    dispatch({ type: 'setUser', payload: data });
    message.success(`欢迎回来，${data.nickname}！`);
    setPopoverVisible && setPopoverVisible(false);
    signInSuccess && signInSuccess();
  }, [activeTabKey, formData, signInSuccess, setPopoverVisible, dispatch]);
  const addonAfter = useCaptcha(formData);
  return (
    <LoginDialogWrapper className={className}>
      <Tabs type="card" size="small" activeKey={activeTabKey} onChange={(activeKey) => setActiveTabKey(activeKey as ActiveTabKey)}>
        <Tabs.TabPane tab="密码登录" key="signInWithPassword">
          <Input className={'input'} addonBefore="手机号" value={formData.phone} onChange={(e) => handleInputChange('phone', e)} />
          <Input className={'input'} type={'password'} addonBefore="密　码" value={formData.password} onChange={(e) => handleInputChange('password', e)} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="手机验证码登录" key="signInWithCaptcha">
          <Input className={'input'} addonBefore="手机号" value={formData.phone} onChange={(e) => handleInputChange('phone', e)} />
          <Input
            className={'input captcha'}
            addonBefore="验证码"
            addonAfter={addonAfter}
            value={formData.captcha}
            onChange={(e) => handleInputChange('captcha', e)}
          />
        </Tabs.TabPane>
      </Tabs>
      <Button loading={submitLoading} className={'loginButton'} block onClick={signIn}>
        登录
      </Button>
      <Link className={'toSignIn'} to="/auth/sign_up">
        新用户注册
      </Link>
    </LoginDialogWrapper>
  );
};

export default LoginDialog;
