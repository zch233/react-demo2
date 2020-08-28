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
  accountManagerMobile: string;
  accountManagerName: string;
  commodityCategory: string;
  commodityId: string;
  commodityType: 'PATENT';
  cover: string;
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
  remark: string;
  sellerShopAvatar: string;
  sellerShopName: string;
  status: 0 | 1 | 2 | 3 | 4 | 6;
  totalAmount: number;
};

type Preorder = {
  accountManagerId: number;
  accountManagerMobile: string;
  accountManagerName: string;
  cancelTime: string;
  cancelType: 0 | 1 | 2;
  commodityType: string;
  createTime: string;
  expireTime: string;
  id: number;
  memberAccount: string;
  memberId: string;
  memberNickname: string;
  operator: string;
  orderNo: string;
  preStockStatus: 0 | 1 | 2 | 3 | 4;
  productCategory: string;
  productCover: string;
  productId: string;
  productName: string;
  productNumber: string;
  productPrice: number;
  reserveIdentifier: 'MEMBER' | 'ACCOUNT_MANAGER';
  sellerShopName: string;
  status: 0 | 1 | 2 | 3;
  updateTime: string;
};

type address = {};
type User = {
  account: string;
  addresses: address[];
  avatar: string;
  birthday: string;
  corporation: string;
  createTime: string;
  email: string;
  hasExpiredVip: boolean;
  hasSeller: boolean;
  hasVip: boolean;
  integration: string;
  memberId: string;
  mobile: string;
  name: string;
  nickname: string;
  referrer: string;
  seller: boolean;
  sex: 0 | 1 | 3;
  status: 'NORMAL' | 'DEAD';
  type: 'MEMBER' | 'SYS_USER' | 'EMPLOYEE';
  updateTime: string;
  vipBeginDate: string;
  vipExpireDate: string;
  vipIcon: string;
  vipId: string;
  vipLevel: string;
  vipName: string;
};
