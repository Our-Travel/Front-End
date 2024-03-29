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
  Cancel: {
    ko: '취소하기',
    en: 'Cancel',
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
  QUESTION_LOGOUT: {
    ko: '로그아웃 하시겠습니까?',
    en: 'Do you want to log out?',
  },
  QUESTION_DELETE: {
    ko: '삭제 하시겠습니까?',
    en: 'Do you want to delete?',
  },
  QUESTION_CLOSE: {
    ko: '마감 하시겠습니까?',
    en: 'Do you want to close?',
  },
  EMAIL: {
    ko: '이메일',
    en: 'Email',
  },
  PASSWORD: {
    ko: '비밀번호',
    en: 'PassWord',
  },
  RECONFIRM_PASSWORD: {
    ko: '비밀번호 재확인',
    en: 'Reconfirm Password',
  },
  CHECK_EMAIL: {
    ko: '형식에 알맞는 이메일을 입력해주세요.',
    en: 'Please provide an email in the appropriate format.',
  },
  PLACEHOLDER_PASSWORD: {
    ko: '영문, 숫자, 특수문자 포함 8~16자',
    en: '(8-16)including letters, numbers, and special characters',
  },
  PLACEHOLDER_NICKNAME: {
    ko: '한글, 영문, 숫자 가능 3~8자',
    en: '(3-8)including Korean, English, and numbers',
  },
  NICKNAME: {
    ko: '닉네임',
    en: 'Nick Name',
  },
  SIGN_UP: {
    ko: '회원가입',
    en: 'SignUp',
  },
  DOUBLE_CHECK: {
    ko: '중복확인',
    en: 'double check',
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
  //메인 그래프
  GRAPH_YEAR: {
    ko: '년 상반기',
    en: 'first half of the year',
  },
  VISITOR_STATUS: {
    ko: '의 방문객 현황입니다.',
    en: 'visitor status',
  },
  REPAINT_GRAPH: {
    ko: '그래프가 제대로 그려지지 않는다면, 지역명을 클릭해주세요',
    en: 'If the graph is not displaying correctly, please click on the region name',
  },
  REGION_VISITOR: {
    ko: '지역별 방문자 수를 확인하세요',
    en: 'Check the number of visitors by region',
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
  HOST_DELETE: {
    ko: 'Host 삭제하기',
    en: 'To delete',
  },
  DELETE: {
    ko: '삭제하기',
    en: 'To delete',
  },
  DEADLINE: {
    ko: '마감하기',
    en: 'To deadline',
  },
  REGISTER_SIGNUP: {
    ko: '가입하기',
    en: 'Register',
  },
  FOLDING: {
    ko: '접기',
    en: 'Folding',
  },
  MORE: {
    ko: '더보기',
    en: 'More',
  },
  OUT: {
    ko: '나가기',
    en: 'OUT',
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
  //피드백
  FEEDBACK: {
    ko: '여러분의 소중한 의견에 감사드립니다.',
    en: 'Thank you for your valuable opinions.',
  },
  PROVIDE_OPINION: {
    ko: '소중한 의견을 적어주세요',
    en: 'Please provide your valuable opinion.',
  },
  SEND: {
    ko: '보내기',
    en: 'Send',
  },
  EDIT: {
    ko: '수정하기',
    en: 'Edit',
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
  NOHOST: {
    ko: '해당 지역에 등록된 host가 없습니다.',
    en: 'No hosts are registered in your area.',
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
  SIR: {
    ko: '님의',
    en: "'s",
  },
  CHATROOM: {
    ko: '단체방',
    en: 'group chat',
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
