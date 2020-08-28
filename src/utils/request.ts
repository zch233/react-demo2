import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
axios.defaults.baseURL = process.env.REACT_APP_BASE_API;
axios.defaults.timeout = 30000;
const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log('😭😭😭😭😭😭', error); // for debug
    message.error(error);
    return Promise.reject(error);
  }
);
export const errorHandle = (response: AxiosResponse) => {
  const res = response.data;
  if (res.code !== 200) {
    if (res.code === 401) {
      window.location.href = `/auth/sign_in?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
    }
    message.error(res.msg || '未知错误，请刷新页面重试');
    throw res;
  }
};
instance.interceptors.response.use(
  (response) => {
    errorHandle(response);
    return Promise.resolve(response.data);
  },
  (error) => {
    errorHandle(error.response);
    console.log('😭😭😭😭😭😭' + error); // for debug
    message.error(error);
    return Promise.reject(error);
  }
);

export default instance;
