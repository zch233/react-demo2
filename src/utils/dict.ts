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

export const PATENT_STOCK_STATUS = {
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
