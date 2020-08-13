import { selector } from 'recoil';
import axios from 'axios';

export const currentUserNameQuery = selector({
  key: 'inputValue',
  get: async () => {
    const response = await axios.get('/pub/api/v1/contactConfig/list');
    return response.data;
  },
});
