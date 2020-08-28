import { atom, selector } from 'recoil';
import request from '../utils/request';

export const todoListState = atom<number[]>({
  key: 'todoListState',
  default: [],
});

export const contactConfig = selector({
  key: 'ContactConfig',
  get: async () => {
    const { data } = await request.get('/pub/api/v1/contactConfig/list');
    return data;
  },
});
