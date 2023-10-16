export function convertAddressToKey(address: string) {
  switch (address) {
    case '세종':
      return '세종';
    case '경기':
      return '경기';
    case '강원':
      return '강원';
    case '충북':
      return '충북';
    case '충남':
      return '충남';
    case '전북':
      return '전북';
    case '전남':
      return '전남';
    case '경북':
      return '경북';
    case '경남':
      return '경남';
    case '제주':
      return '제주';
    default:
      return address;
  }
}
