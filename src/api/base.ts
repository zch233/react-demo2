import request from '../utils/request';

export const getContactConfig = () => {
  return request({
    url: '/pub/api/v1/contactConfig/list',
    method: 'get',
  });
};
