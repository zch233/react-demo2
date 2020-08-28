import request from '../../utils/request';

export const getVipPurchase = () => {
  return request({
    url: '/api/v1/vip',
    method: 'get',
  });
};

type OrderVip = {
  payRoute: string;
  tradeType: string;
  vipLevelId: number;
};
export const orderVip = (data: OrderVip) => {
  return request({
    url: '/api/v1/vip/order',
    method: 'post',
    data,
  });
};
