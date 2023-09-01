import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface hostData {
  host_intro: string;
  host_hashTag: string;
  host_region: string | undefined;
}

export const userName = atom<string>({
  key: 'userName',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const hostCheck = atom<boolean>({
  key: 'hostCheck',
  default: false,
});

export const hostInfo = atom<{ [user: string]: hostData[] }>({
  key: 'hostInfo',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
