import React, { useCallback, useMemo, useState } from 'react';
import { Button, Checkbox, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import * as api from './api';
import { signInWithPassword } from '../SignIn/api';
import useCaptcha from '../../hooks/useCaptcha';
import { Wrapper } from './index.Styles';
import * as queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const SignUp: React.FC = () => {
  const history = useHistory();
  const params = useMemo(() => queryString.parse(window.location.search) as { code?: string; redirect?: string }, []);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    captcha: '',
    password: '',
    phone: '',
    referrer: params.code,
  });
  const [referrerVisible, setReferrerVisible] = useState(!!params.code);
  const handleInputChange = useCallback(
    (key: string, event: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({
        ...formData,
        [key]: event.target.value,
      }),
    [formData]
  );
  const signUp = useCallback(async () => {
    setSubmitLoading(true);
    await api.signUp(formData).finally(() => setSubmitLoading(false));
    message.success('注册成功!');
    const hide = message.loading('正在为您自动登录...');
    await signInWithPassword(formData).finally(() => hide());
    history.push(params.redirect || '/');
    message.success('登录成功!');
  }, [formData, history, params]);
  const addonAfter = useCaptcha(formData);
  return (
    <Wrapper>
      <h3>新用户注册</h3>
      <Input className={'input'} addonBefore="手机号" value={formData.phone} onChange={(e) => handleInputChange('phone', e)} />
      <Input type={'password'} className={'input'} addonBefore="密　码" value={formData.password} onChange={(e) => handleInputChange('password', e)} />
      <Input
        className={'input captcha'}
        addonBefore="验证码"
        value={formData.captcha}
        onChange={(e) => handleInputChange('captcha', e)}
        addonAfter={addonAfter}
        onKeyUp={(e) => e.keyCode === 13 && signUp()}
      />
      <Checkbox disabled={!!params.code} defaultChecked={!!params.code} className={'checkbox'} onChange={(e) => setReferrerVisible(e.target.checked)}>
        填写推荐人
      </Checkbox>
      {referrerVisible && (
        <Input
          disabled={!!params.code}
          className={'input'}
          onKeyUp={(e) => e.keyCode === 13 && signUp()}
          addonBefore="推荐人"
          onChange={(e) => handleInputChange('referrer', e)}
          value={formData.referrer}
        />
      )}
      <Button loading={submitLoading} className={'signUpButton'} block onClick={signUp}>
        注 册
      </Button>
      <Link to={'/auth/sign_in'}>已有账号，去登录</Link>
    </Wrapper>
  );
};

export default SignUp;
