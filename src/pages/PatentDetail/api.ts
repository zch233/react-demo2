import request from '../../utils/request';

export const getPatentDetail = (number: string) => {
  return request({
    url: `/pub/api/v1/patent/${number}`,
    method: 'get',
  });
};
