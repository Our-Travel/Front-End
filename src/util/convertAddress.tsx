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
