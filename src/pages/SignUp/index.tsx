import React, { useCallback, useState } from 'react';
import { Button, Checkbox, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import * as api from './api';
import useCaptcha from '../../hooks/useCaptcha';
import { Wrapper } from './index.Styles';

const SignUp: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    captcha: '',
    password: '',
    phone: '',
    referrer: '',
  });
  const [referrerVisible, setReferrerVisible] = useState(false);
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
    await api.signUp(formData).finally(() => setSubmitLoading(false));
    message.success('注册成功!');
  }, [formData]);
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
      />
      <Checkbox className={'checkbox'} onChange={(e) => setReferrerVisible(e.target.checked)}>
        填写推荐人
      </Checkbox>
      {referrerVisible && <Input className={'input'} addonBefore="推荐人" onChange={(e) => handleInputChange('referrer', e)} value={formData.referrer} />}
      <Button loading={submitLoading} className={'signUpButton'} block onClick={signIn}>
        注 册
      </Button>
      <Link to={'/auth/sign_in'}>已有账号，去登录</Link>
    </Wrapper>
  );
};

export default SignUp;
