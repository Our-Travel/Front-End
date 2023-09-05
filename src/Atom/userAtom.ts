import { atom } from 'recoil';

export const hostCheck = atom<boolean>({
  key: 'hostCheck',
  default: false,
});
