import request from '../../utils/request';
type CaptchaParams = {
  phone: string;
};
type SignUpData = {
  captcha: string;
  password: string;
  phone: string;
  referrer?: string;
};
export const getCaptcha = (params: CaptchaParams) => {
  return request({
    url: '/pub/api/v1/captcha/pt-authc/sms',
    method: 'get',
    params,
  });
};

export const signUp = (data: SignUpData) => {
  return request({
    url: '/pub/api/v1/authc/regByMobile',
    method: 'post',
    data,
  });
};
