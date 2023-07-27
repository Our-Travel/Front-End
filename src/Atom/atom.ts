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
export const accommodation = atom<Place[] | null>({
  key: 'accommodation',
  default: null,
});