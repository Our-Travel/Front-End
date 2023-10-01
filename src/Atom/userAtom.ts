import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loginType = atom<boolean>({
  key: 'loginType',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const hostCheck = atom<boolean>({
  key: 'hostCheck',
  default: false,
});

export const hostRoomId = atom<number>({
  key: 'hostRoomId',
  default: 0,
  // effects_UNSTABLE: [persistAtom],
});

// roomId 테스트
export const roomList = atom<number[]>({
  key: 'roomList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const profileUpdate = atom<boolean>({
  key: 'profileUpdate',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
