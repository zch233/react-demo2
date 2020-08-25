import React, { useCallback, useMemo, useState } from 'react';
import * as api from '../pages/SignUp/api';
import { Button, message, Statistic } from 'antd';

const useCaptcha = ({ phone }: { phone: string }) => {
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const getCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    await api.getCaptcha({ phone }).finally(() => setCaptchaLoading(false));
    message.success('验证码发送成功，请及时查看');
    setCaptchaVisible(true);
  }, [phone]);
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
  return captchaVisible ? AddonAfterCountdown : addonAfterButton;
};

export default useCaptcha;
