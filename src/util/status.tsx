export const STATUS = {
  UPCOMING: '모집예정',
  OPEN: '모집중',
  FULL: '인원제한',
  CLOSED: '모집마감',
};

export function getStatusInKorean(status: string): string {
  switch (status) {
    case 'UPCOMING':
      return '모집예정';
    case 'OPEN':
      return '모집중';
    case 'FULL':
      return '인원제한';
    case 'CLOSED':
      return '모집마감';
    default:
      return '알 수 없음';
  }
}
