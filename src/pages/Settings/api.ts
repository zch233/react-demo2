import request from '../../utils/request';

type UpdateUsername = {
  birthday?: string;
  captcha?: string;
  name?: string;
  newPassword?: string;
  nickname?: string;
  phone?: string;
  sex?: number;
};
export const updateUsername = (data: UpdateUsername) => {
  return request({
    url: '/api/v1/member',
    method: 'put',
    data,
  });
};
type UpdatePassword = {
  newPassword: string;
  originPassword: string;
};
export const updatePassword = (data: UpdatePassword) => {
  return request({
    url: '/api/v1/member/password',
    method: 'put',
    data,
  });
};

type Address = {
  city: string;
  defaultAddress: boolean;
  detail: string;
  id: number;
  name: string;
  phone: string;
  postCode: string;
  province: string;
  region: string;
  street: string;
};
export const getAddresses = () => {
  return request({
    url: '/api/v1/member/addresses',
    method: 'get',
  });
};
export const getAddress = ({ id }: Address) => {
  return request({
    url: `/api/v1/member/address/${id}`,
    method: 'get',
  });
};
export const addAddress = (data: Address) => {
  return request({
    url: '/api/v1/member/address',
    method: 'post',
    data,
  });
};
export const updateAddress = (data: Address) => {
  return request({
    url: '/api/v1/member/address',
    method: 'put',
    data,
  });
};
export const deleteAddress = ({ id }: Address) => {
  return request({
    url: `/api/v1/member/address/${id}`,
    method: 'delete',
  });
};
