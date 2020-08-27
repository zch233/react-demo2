import request from '../../utils/request';
export type GetOrders = {
  no?: number;
  size?: number;
  commodityType?: string;
  endCreateDate?: string;
  endPaymentDate?: string;
  orderBy?: string;
  orderNo?: string;
  sort?: string;
  startCreateDate?: string;
  startPaymentDate?: string;
  status?: string;
};
export const getOrders = (params: GetOrders) => {
  return request({
    url: '/api/v1/order',
    method: 'get',
    params,
  });
};

export const deleteOrder = ({ orderNo }: Order) => {
  return request({
    url: `/api/v1/order?orderNo=${orderNo}`,
    method: 'delete',
  });
};
