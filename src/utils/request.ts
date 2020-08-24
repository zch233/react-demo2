import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 30000,
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
const errorHandle = (response: AxiosResponse) => {
  const res = response.data;
  if (res.code !== 200) {
    message.error(res.msg);
    throw res.msg;
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
