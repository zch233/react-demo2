import request from '../../utils/request';

export type GetPreorders = {
  no?: number;
  size?: number;
  account?: string;
  dataScope?: string;
  endDateTime?: string;
  memberId?: string;
  orderBy?: string;
  orderNo?: string;
  productNumber?: string;
  sort?: string;
  startDateTime?: string;
  status?: number;
};
export const getPreorders = (params: GetPreorders) => {
  return request({
    url: '/api/v1/reserve',
    method: 'get',
    params,
  });
};
type CancelPreorder = {
  reserveProductId: string;
};
export const cancelPreorder = (params: CancelPreorder) => {
  return request({
    url: '/api/v1/reserve',
    method: 'put',
    params,
  });
};
