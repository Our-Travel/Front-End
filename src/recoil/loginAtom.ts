import { atom } from 'recoil';

interface User {
  email: string;
  nickName: string;
}

export const token = atom<string>({
  key: 'token',
  default: '',
});

export const userLogin = atom<User>({
  key: 'userLogin',
  default: {
    email: '',
    nickName: '',
  },
});
