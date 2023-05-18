import Header from '../../components/Header/Header';
import { MypageTab, Profile } from '../../components/MypageInfo/MypageInfo';
import { Link } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';
import { MdLogout, MdPersonRemove, MdOutlineMail } from 'react-icons/md';
import { IconType } from 'react-icons';

const icons: { Icon: IconType; link: string; text: string }[] = [
  {
    Icon: BiBell,
    link: '/mypage/notice',
    text: '공지사항',
  },
  {
    Icon: MdLogout,
    link: '/',
    text: '로그아웃',
  },
  {
    Icon: MdOutlineMail,
    link: '/',
    text: '고객센터',
  },
  {
    Icon: MdPersonRemove,
    link: '/',
    text: '회원탈퇴',
  },
];

const MyPage = () => {
  return (
    <>
      <Header title={'마이페이지'} showButton={false} />
      <div className="flex flex-col gap-4 w-[25rem] mx-auto my-6">
        <Profile />
        <button className="w-[25rem] h-9 mb-7 border rounded border-main-color text-main-color hover:bg-main-color hover:text-white">프로필 수정</button>
        <div className="flex flex-col gap-5 line">
          <MypageTab name={'내가 작성한 글'} link={'/mypage/mywrite'} />
          <MypageTab name={'즐겨찾기'} link={'/mypage/favorite'} />
        </div>
        <div className="grid grid-cols-2 w-80 h-60 mx-auto my-3">
          {icons.map(({ Icon, link, text }, index) => (
            <div key={index} className="flex items-center justify-center">
              <Link to={link} className="flex flex-col items-center p-3">
                <Icon className="w-12 h-12" />
                <p>{text}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;
