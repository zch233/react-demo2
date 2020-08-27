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
