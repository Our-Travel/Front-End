import { StringEssetType } from '../hooks/useMultilingual';

const STRING_ESSETS: StringEssetType = {
  // 공통 사용
  TITLE: {
    ko: '제목',
    en: 'Title',
  },
  POST_TITLE_PLACEHOLDER: {
    ko: '제목을 입력해주세요',
    en: 'Please enter the subject.',
  },
  CONTENT: {
    ko: '내용',
    en: 'Content',
  },
  POST_CONTENT_PLACEHOLDER: {
    ko: '일정/장소를 작성하여 동료를 찾아보세요!',
    en: 'Please enter schedule/location.',
  },
  Write: {
    ko: '작성하기',
    en: 'Write',
  },
  Recruitmentperiod: {
    ko: '모집기간',
    en: 'Recruitment period.',
  },
  Travelperiod: {
    ko: '여행기간',
    en: 'Travel period.',
  },
  TravelPersonnel: {
    ko: '여행인원',
    en: 'Number of people traveling',
  },
  Uptopeople: {
    ko: '(최대인원은 30명 입니다.)',
    en: '(Up to 30 people)',
  },
  LOG_IN: {
    ko: '로그인',
    en: 'Login',
  },
  LOG_OUT: {
    ko: '로그아웃',
    en: 'Logout',
  },
  EMAIL: {
    ko: '이메일',
    en: 'Email',
  },
  PASSWORD: {
    ko: '패스워드',
    en: 'PassWord',
  },
  NICKNAME: {
    ko: '닉네임',
    en: 'NickName',
  },
  CHECK: {
    ko: '중복확인',
    en: 'Duplicate Check',
  },
  SIGN_UP: {
    ko: '회원가입',
    en: 'SignUp',
  },
  TAKE_A_TOUR: {
    ko: '둘러보기',
    en: 'Preview',
  },
  SOCIAL_LOGIN: {
    ko: '소셜 로그인',
    en: 'Social Login',
  },
  FEED_BACK: {
    ko: '피드백',
    en: 'Feedback',
  },
  FRIEND_FIND: {
    ko: '여행친구 구하기',
    en: 'Finding a Travel Friend',
  },
  // 지역이름
  서울: {
    ko: '서울',
    en: 'Seoul',
  },
  부산: {
    ko: '부산',
    en: 'Busan',
  },
  대구: {
    ko: '대구',
    en: 'Daegu',
  },
  인천: {
    ko: '인천',
    en: 'Incheon',
  },
  광주: {
    ko: '광주',
    en: 'Gwangju',
  },
  대전: {
    ko: '대전',
    en: 'Daejeon',
  },
  울산: {
    ko: '울산',
    en: 'Oulsan',
  },
  세종: {
    ko: '세종',
    en: 'Sejong',
  },
  경기: {
    ko: '경기',
    en: 'Gyeonggi',
  },
  강원: {
    ko: '강원',
    en: 'Gangwon',
  },
  충북: {
    ko: '충북',
    en: 'Chungbuk',
  },
  충남: {
    ko: '충남',
    en: 'Chungnam',
  },
  전북: {
    ko: '전북',
    en: 'Jeonbuk',
  },
  전남: {
    ko: '전남',
    en: 'Jeonnam',
  },
  경북: {
    ko: '경북',
    en: 'Gyeongbuk',
  },
  경남: {
    ko: '경남',
    en: 'Gyeongnam',
  },
  제주: {
    ko: '제주',
    en: 'Jeju',
  },
  // 메인 지역지도
  방문객수: {
    ko: '방문객수',
    en: 'VISITOR COUNT',
  },
  HOST등록수: {
    ko: 'HOST 등록수',
    en: 'HOST COUNT',
  },
  HOST_COUNT_CLICK: {
    ko: '해당 지역의 등록된 Host 수를 참고하여 클릭해 보세요.',
    en: 'Click on the host count in your area',
  },
  // host 등록 및 수정
  INTRODUCTION: {
    ko: '한줄소개',
    en: 'One line introduction',
  },
  HASHTAG: {
    ko: '해시태그',
    en: 'Hashtag',
  },
  LOCATION: {
    ko: '위치',
    en: 'Location',
  },
  MODIFY_INFO: {
    ko: '※ 기존에 등록된 정보를 참고하여 수정 해주세요.',
    en: '※ Please refer to the registered information and modify it.',
  },
  REGISTER: {
    ko: '등록하기',
    en: 'To register',
  },
  MODIFY: {
    ko: '수정하기',
    en: 'To modify',
  },
  DELETE: {
    ko: 'Host 삭제하기',
    en: 'To delete',
  },
  // 프로필 수정
  PROFILE_IMAGE_EDIT: {
    ko: '프로필 이미지 편집',
    en: 'Edit Profile Image',
  },
  DEFAUIT_IMAGE: {
    ko: '기본 이미지로 변경',
    en: 'Change to default image',
  },
  SOCIAL_LOGIN_PASSWORD: {
    ko: '※ 소셜 로그인은 비밀번호 변경이 불가능합니다.',
    en: '※ Social login is not password changeable.',
  },
  PASSWORD_CHANGE: {
    ko: '비밀번호 변경',
    en: 'Change your password',
  },
  PASSWORD_CHECK: {
    ko: '비밀번호 재확인',
    en: 'Double-check your password',
  },
  // 타이틀
  Our_Travel: {
    ko: 'Our Travel',
    en: 'Our Travel',
  },
  // 게시물 작성
  NOWRITE: {
    ko: '작성된 글이 없어요.',
    en: 'There are no posts written.',
  },
  NOCHAT: {
    ko: '채팅목록이 없어요.',
    en: 'There is no chat list.',
  },
  NOFAVORITE: {
    ko: '즐겨찾기 된 게시물이 없어요.',
    en: 'There is no chat list.',
  },
  NOSUB: {
    ko: '',
    en: '',
  },
  Writing_encouragement: {
    ko: '글을 작성해 여행할 동료를 구해보세요',
    en: 'Find travel companions by writing post.',
  },
  // 채팅
  CHATLIST: {
    ko: '채팅목록',
    en: 'Chatting List',
  },
  // Header공용 컴포넌트
  MYPAGE: {
    ko: '마이페이지',
    en: 'Mypage',
  },
  PROFILE_EDIT: {
    ko: '프로필수정',
    en: 'Edit profile',
  },
  WRITTEN_BY_ME: {
    ko: '내가 작성한 글',
    en: 'Post written by me',
  },
  WRITE_POST: {
    ko: '게시글 작성',
    en: 'Write Post',
  },
  WRITE_POST_ALERT: {
    ko: '게시글을 작성하시겠습니까?',
    en: 'Write Post?',
  },
  FAVORITE: {
    ko: '즐겨찾기',
    en: 'Favorite',
  },
  Host등록: {
    ko: 'Host 등록',
    en: 'Host Registration',
  },
  Host수정: {
    ko: 'Host 수정',
    en: 'Modify Host',
  },
  SELECT_AREA: {
    ko: '지역선택',
    en: 'Select Area',
  },
  SELECT_AREA_PLACEHOLDER: {
    ko: '여행할 지역을 선택해주세요.',
    en: 'Please select the region you wish to travel to.',
  },
  NOTICE: {
    ko: '공지사항',
    en: 'Notice',
  },
  NOTFOUND_PAGE: {
    ko: 'Not Found Page',
    en: 'Not Found Page',
  },
  NOTFOUND_PAGE_SUB: {
    ko: 'Please go back!!',
    en: 'Please go back!!',
  },
  TEST: {
    ko: '상대 유저 아이디',
    en: 'Find travel companions by writing post.',
  },
  // 카테고리
  관광지: {
    ko: '관광지',
    en: 'Tourist',
  },
  문화시설: {
    ko: '문화시설',
    en: 'Cultural',
  },
  축제행사: {
    ko: '축제/행사',
    en: 'Festivals',
  },
  여행코스: {
    ko: '여행코스',
    en: 'Courses',
  },
  레포츠: {
    ko: '레포츠',
    en: 'Sports',
  },
  숙박: {
    ko: '숙박',
    en: 'Lodging',
  },
};

// 관광지, 문화시설, 축제/행사, 여행코스, 레포츠 ,숙박
//Tourist attractions, cultural facilities, festivals/events, travel courses, leisure sports, lodging
export default STRING_ESSETS;
