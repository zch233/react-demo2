import request from '../../utils/request';

type GetPatents = {
  no?: number;
  size?: number;
  category?: string;
  certStatus?: number;
  orderBy?: string;
  sort?: string;
  stockStatus?: number;
  subCategory?: string;
  type?: number;
  word?: string;
};
export const getPatents = (params: GetPatents) => {
  return request({
    url: '/pub/api/v1/patent',
    method: 'get',
    params,
  });
};
