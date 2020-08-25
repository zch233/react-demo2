import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Statistic, Button, Checkbox, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import * as api from './api';

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
const SignUp: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [formData, setFormData] = useState({
    captcha: '',
    password: '',
    phone: '',
    referrer: '',
  });
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const [referrerVisible, setReferrerVisible] = useState(false);
  const handleInputChange = useCallback((key: string, event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [key]: event.target.value }), [
    formData,
  ]);
  const getCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    await api.getCaptcha(formData).finally(() => setCaptchaLoading(false));
    setCaptchaVisible(true);
  }, [formData]);
  const signIn = useCallback(async () => {
    setSubmitLoading(true);
    await api.signUp(formData).finally(() => setSubmitLoading(false));
    message.success('注册成功!');
  }, [formData]);
  const AddonAfterCountdown = useMemo(
    () =>
      captchaVisible && (
        <Statistic.Countdown
          onFinish={() => setCaptchaVisible(false)}
          value={Date.now() + 1000 * 60}
          valueStyle={{ lineHeight: 1 }}
          suffix={'s'}
          format={'ss'}
        />
      ),
    [captchaVisible]
  );
  const addonAfterButton = useMemo(
    () => (
      <Button loading={captchaLoading} block onClick={getCaptcha}>
        获取
      </Button>
    ),
    [captchaLoading, getCaptcha]
  );
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
        addonAfter={captchaVisible ? AddonAfterCountdown : addonAfterButton}
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
