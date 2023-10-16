import { LanguageType } from 'hooks/useMultilingual';
import { atom } from 'recoil';
interface Place {
  address_name: string;
  distance: number;
  id: number;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

export const token = atom({
  key: 'token',
  default: null,
});

export const aroundLoc = atom<Place[] | null>({
  key: 'aroundLoc',
  default: null,
});

export const chattingenter = atom<any>({
  key: 'chattingenter',
  default: null,
});
export const boardItem = atom<any>({
  key: 'boardItem',
  default: null,
});
export const langConvert = atom<LanguageType>({
  key: 'langConvert',
  default: 'ko',
});
