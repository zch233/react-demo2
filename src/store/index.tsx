import { atom, selector } from 'recoil';
import axios from 'axios';

export const todoListState = atom<number[]>({
  key: 'todoListState',
  default: [],
});

export const currentUserNameQuery = selector({
  key: 'inputValue',
  get: async () => {
    const response = await axios.get('/pub/api/v1/contactConfig/list');
    return response.data;
  },
});
