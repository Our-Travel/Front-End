import { atom } from 'recoil';

interface IUser {
  data: string;
  state: boolean;
}

interface User {
  email: IUser | null;
  password: IUser | null;
  nickName: IUser | null;
}

interface status {
  email: number | null;
  nickName: number | null;
}

export const userInfo = atom<User>({
  key: 'userInfo',
  default: {
    email: null,
    password: null,
    nickName: null,
  },
});

export const signUpStatus = atom<status>({
  key: 'signUpStatus',
  default: {
    email: null,
    nickName: null,
  },
});
