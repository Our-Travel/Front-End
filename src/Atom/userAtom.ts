import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const hostCheck = atom<boolean>({
  key: 'hostCheck',
  default: false,
});

export const hostRoomId = atom<number>({
  key: 'hostRoomId',
  default: 0,
});

export const profileUpdate = atom<boolean>({
  key: 'profileUpdate',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
