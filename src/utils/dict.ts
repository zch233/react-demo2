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

type TYPE_PATENT_STOCK_STATUS = {
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
export const PATENT_STOCK_STATUS: TYPE_PATENT_STOCK_STATUS = {
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

type TYPE_ORDER_STATUS = {
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

export const ORDER_STATUS: TYPE_ORDER_STATUS = {
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

type TYPE_PREORDER_STATUS = {
  CANCEL: 0;
  CREATED: 1;
  ORDER: 2;
  PAYED: 3;
  label: {
    '0': '已取消';
    '1': '预留中';
    '2': '已下单';
    '3': '已支付';
  };
};
export const PREORDER_STATUS: TYPE_PREORDER_STATUS = {
  CANCEL: 0,
  CREATED: 1,
  ORDER: 2,
  PAYED: 3,
  label: {
    '0': '已取消',
    '1': '预留中',
    '2': '已下单',
    '3': '已支付',
  },
};

type TYPE_PREORDER_REFERER = {
  MEMBER: 'MEMBER';
  ACCOUNT_MANAGER: 'ACCOUNT_MANAGER';
  label: {
    MEMBER: '商城会员';
    ACCOUNT_MANAGER: '客户经理';
  };
};

export const PREORDER_REFERER: TYPE_PREORDER_REFERER = {
  MEMBER: 'MEMBER',
  ACCOUNT_MANAGER: 'ACCOUNT_MANAGER',
  label: {
    MEMBER: '商城会员',
    ACCOUNT_MANAGER: '客户经理',
  },
};

type TYPE_PREORDER_CANCEL_TYPE = {
  EXPIRED: 0;
  MEMBER: 1;
  ACCOUNT_MANAGER: 2;
  label: {
    '0': '超时';
    '1': '用户';
    '2': '客户经理';
  };
};
export const PREORDER_CANCEL_TYPE: TYPE_PREORDER_CANCEL_TYPE = {
  EXPIRED: 0,
  MEMBER: 1,
  ACCOUNT_MANAGER: 2,
  label: {
    '0': '超时',
    '1': '用户',
    '2': '客户经理',
  },
};
export type TYPE_PAY_ROUTES = [
  {
    icon: 'aliPay';
    label: '支付宝';
    description: '数亿用户都用，安全可托付';
    payRoute: 'ALIPAY';
    tradeType: 'WEB';
  },
  {
    icon: 'unionPay';
    label: '在线支付';
    description: '欢迎使用银联支付';
    payRoute: 'UNION_PAY';
    tradeType: 'WEB';
  },
  {
    icon: 'wechatPay';
    label: '微信';
    description: '微信，是一种生活方式';
    payRoute: 'WXPAY';
    tradeType: 'NATIVE';
  }
];
export const PAY_ROUTES: TYPE_PAY_ROUTES = [
  {
    icon: 'aliPay',
    label: '支付宝',
    description: '数亿用户都用，安全可托付',
    payRoute: 'ALIPAY',
    tradeType: 'WEB',
  },
  {
    icon: 'unionPay',
    label: '在线支付',
    description: '欢迎使用银联支付',
    payRoute: 'UNION_PAY',
    tradeType: 'WEB',
  },
  {
    icon: 'wechatPay',
    label: '微信',
    description: '微信，是一种生活方式',
    payRoute: 'WXPAY',
    tradeType: 'NATIVE',
  },
];
