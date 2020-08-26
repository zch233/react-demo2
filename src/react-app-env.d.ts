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
  legalStatus: string;
  name: string;
  number: string;
  paymentDeadline: string;
  price: number;
  reserveExpireTime: string;
  reserveMemberId: string;
  stockStatus: number;
  tags: string;
  type: number;
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
