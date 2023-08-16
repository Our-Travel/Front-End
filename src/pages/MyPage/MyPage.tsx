import React, { useState, MouseEvent } from 'react';
import Header from '../../components/Header/Header';
import { MypageTab, Profile } from '../../components/MypageInfo/MypageInfo';
import { Link } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';
import { BsPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import { MdLogout, MdPersonRemove } from 'react-icons/md';
import { IconType } from 'react-icons';
import UploadProfile from '../../components/Modal/UploadProfile';
import { useRecoilValue } from 'recoil';
import { hostCheck } from '../../Atom/userAtom';
import WriteButton from '../../components/Chatting/WriteButton';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { token } from '../../Atom/atom';

const MyPage = () => {
  const hostActive = useRecoilValue(hostCheck);
  const icons: { Icon: IconType | string; link: string; text: string }[] = [
    {
      Icon: hostActive ? BsPencilFill : BsPatchCheckFill,
      link: hostActive ? '/mypage/host/edit' : '/mypage/host',
      text: hostActive ? 'Host수정' : 'Host 등록',
    },
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
      Icon: MdPersonRemove,
      link: '/',
      text: '회원탈퇴',
    },
  ];
  const [modal, setModal] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('');
  const [uploadModalOpen, setUploadModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const resetToken = useResetRecoilState(token);

  const handleImage = () => {
    setUploadModal(true);
  };
  const closeImagePopup = () => {
    setUploadModal(false);
  };

  const isOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setModal(!modal);
    setIcon(target.name);
  };

  const logout = () => {
    resetToken();
    localStorage.removeItem('token');
    navigate('/');
    alert('로그아웃 되었습니다.👋');
  };

  const MemberDelete = () => {
    console.log('회원탈퇴');
  };

  return (
    <>
      <Header title={'마이페이지'} back={false} icon={''} />
      {modal && <WriteButton title={icon === '로그아웃' ? '로그아웃 하시겠습니까?' : '회원탈퇴 하시겠습니까?'} button={icon === '로그아웃' ? '로그아웃' : '회원탈퇴'} setModal={setModal} handleButton={icon === '로그아웃' ? logout : MemberDelete} />}
      <div className="flex flex-col gap-4 w-[25rem] mx-auto my-6">
        <Profile />
        <button className="w-[25rem] h-9 mb-7 border rounded border-main-color text-main-color hover:bg-main-color hover:text-white">프로필 수정</button>
        <div className="flex flex-col gap-5 line">
          <MypageTab name={'내가 작성한 글'} link={'/mypage/mywrite'} />
          <MypageTab name={'즐겨찾기'} link={'/mypage/favorite'} />
        </div>
        <ul className="grid grid-cols-2 w-80 h-60 mx-auto my-3">
          {icons.map(({ Icon, link, text }, index) => (
            <li key={index} className="flex items-center justify-center">
              {index <= 1 ? (
                <Link to={link} className="flex flex-col items-center p-3">
                  <Icon className={` w-11 h-11 mb-1 ${index ? '' : hostActive ? 'w-9 h-10 text-black' : 'text-main-color'}`} />
                  <p>{text}</p>
                </Link>
              ) : (
                <button type="button" name={text} className="p-3" onClick={isOpen}>
                  <div className="flex flex-col items-center pointer-events-none">
                    <Icon className="w-11 h-11 mb-1" />
                    <p>{text}</p>
                  </div>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {uploadModalOpen && <UploadProfile onClose={closeImagePopup} />}
    </>
  );
};

export default MyPage;
