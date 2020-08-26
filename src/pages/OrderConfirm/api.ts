import request from '../../utils/request';
type OrderConfirm = {
  commodityId: string;
  commodityType: string;
};
export const getOrderConfirm = (params: OrderConfirm) => {
  return request({
    url: '/api/v1/order/confirm',
    method: 'get',
    params,
  });
};
type payOrder = {
  addressId?: number;
  commodityId: string;
  commodityType: 'PATENT';
  payRoute: string;
  tradeType: string;
  remark?: string;
};
export const payOrder = (data: payOrder) => {
  return request({
    url: '/api/v1/order',
    method: 'post',
    data,
  });
};
