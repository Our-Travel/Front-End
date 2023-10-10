const regions = [
  { key: '서울', value: 11 },
  { key: '부산', value: 26 },
  { key: '대구', value: 27 },
  { key: '인천', value: 28 },
  { key: '광주', value: 29 },
  { key: '대전', value: 30 },
  { key: '울산', value: 31 },
  { key: '세종', value: 36 },
  { key: '경기', value: 41 },
  { key: '강원', value: 42 },
  { key: '충청북도', value: 43 },
  { key: '충청남도', value: 44 },
  { key: '전라북도', value: 45 },
  { key: '전라남도', value: 46 },
  { key: '경상북도', value: 47 },
  { key: '경상남도', value: 48 },
  { key: '제주도', value: 50 },
];

export default regions;

export function convertAddressToKey(address: string) {
  switch (address) {
    case '세종특별자치시':
      return '세종';
    case '경기':
      return '경기도';
    case '강원특별자치도':
      return '강원도';
    case '충북':
      return '충청북도';
    case '충남':
      return '충청남도';
    case '전북':
      return '전라북도';
    case '전남':
      return '전라남도';
    case '경북':
      return '경상북도';
    case '경남':
      return '경상남도';
    case '제주특별자치도':
      return '제주도';
    default:
      return address;
  }
}
