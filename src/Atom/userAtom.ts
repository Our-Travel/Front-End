import { atom } from 'recoil';
// import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

export const hostCheck = atom<boolean>({
  key: 'hostCheck',
  default: false,
});

export const hostRoomId = atom<number>({
  key: 'hostRoomId',
  default: 0,
});
