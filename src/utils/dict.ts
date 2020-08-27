export const PATENT_TYPE = {
  FAMING: 1,
  SHIYONG: 2,
  WAIGUAN: 3,
  label: {
    '1': '发明专利',
    '2': '新型实用专利',
    '3': '外观设计专利',
  },
};

export const PATENT_CERT_STATUS = {
  WEIZHI: 0,
  YIZHENG: 1,
  WEIZHENG: 2,
  label: {
    '0': '未知',
    '1': '已下证',
    '2': '未下证',
  },
};

type PATENT_STOCK_STATUS = {
  DIS_SELL: 0;
  CAN_SELL: 1;
  PRE_SELL: 2;
  DEL_SELL: 3;
  WAIT_SELL: 4;
  label: {
    '0': '已售';
    '1': '可售';
    '2': '预售';
    '3': '已下架';
    '4': '预留中';
  };
};
export const PATENT_STOCK_STATUS: PATENT_STOCK_STATUS = {
  DIS_SELL: 0,
  CAN_SELL: 1,
  PRE_SELL: 2,
  DEL_SELL: 3,
  WAIT_SELL: 4,
  label: {
    '0': '已售',
    '1': '可售',
    '2': '预售',
    '3': '已下架',
    '4': '预留中',
  },
};

type ORDER_STATUS = {
  CREATED: 0;
  PAYED: 1;
  DELIVERED: 2;
  FINISHED: 3;
  CLOSED: 4;
  REFUND: 6;
  label: {
    '0': '订单待付款';
    '1': '订单已付款';
    '2': '订单已发货';
    '3': '订单已完成';
    '4': '订单已关闭';
    '6': '订单已退款';
  };
};

export const ORDER_STATUS: ORDER_STATUS = {
  CREATED: 0,
  PAYED: 1,
  DELIVERED: 2,
  FINISHED: 3,
  CLOSED: 4,
  REFUND: 6,
  label: {
    '0': '订单待付款',
    '1': '订单已付款',
    '2': '订单已发货',
    '3': '订单已完成',
    '4': '订单已关闭',
    '6': '订单已退款',
  },
};
