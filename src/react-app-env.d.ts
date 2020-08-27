/// <reference types="react-scripts" />

type Patent = {
  category: string;
  categoryAliaName: string;
  categoryName: string;
  certStatus: number;
  commodityType: string;
  cover: string;
  createTime: string;
  id: string;
  inventorExplain: string;
  legalStatus: 0 | 1 | 2;
  name: string;
  number: string;
  paymentDeadline: string;
  price: number;
  reserveExpireTime: string;
  reserveMemberId: string;
  stockStatus: 0 | 1 | 2 | 3 | 4;
  tags: string;
  type: 1 | 2 | 3;
};

type Category = {
  id: number;
  name: string;
  aliaName: string;
  code: string;
  icon: null;
  cover: null;
  sort: number;
  description: null;
  parentIds: null;
  parentId: number;
  children: subCategory[];
};

type SubCategory = {
  id: number;
  name: string;
  aliaName: string;
  code: string;
  icon: null;
  cover: null;
  sort: number;
  description: null;
  parentIds: string;
  parentId: number;
  children: never[];
};

type Shop = {
  shopContact: string;
  shopAvatar: string;
  shopName: string;
  shopDesc: string;
};
type Discount = {
  id: null;
  isCumulate: null;
  price: number;
  type: number;
};
type Pay = {
  totalAmount: number;
  address: string;
  discounts: Discount[];
};
type Order = {
  accountManagerMobile: null;
  accountManagerName: null;
  commodityCategory: string;
  commodityId: string;
  commodityType: 'PATENT';
  cover: null;
  createTime: string;
  deliverySn: null;
  discounts: Discount[];
  invoiceStatus: null;
  name: string;
  number: string;
  orderNo: string;
  payStatus: string;
  price: number;
  remainSecond: number;
  remark: null;
  sellerShopAvatar: string;
  sellerShopName: string;
  status: 0 | 1 | 2 | 3 | 4 | 6;
  totalAmount: number;
};
