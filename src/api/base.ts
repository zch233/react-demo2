import request from '../utils/request';
import axios from 'axios';

export const getContactConfig = () => {
  return request({
    url: '/pub/api/v1/contactConfig/list',
    method: 'get',
  });
};

export const getUserDefault = () => {
  return axios.get('/api/v1/member');
};

export const getUser = () => {
  return request({
    url: '/api/v1/member',
    method: 'get',
  });
};

export const logout = () => {
  return request({
    url: '/api/v1/member/logout',
    method: 'post',
  });
};
