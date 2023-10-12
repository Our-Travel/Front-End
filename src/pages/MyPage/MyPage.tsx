import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { MypageTab, Profile } from '../../components/MypageInfo/MypageInfo';
import { Link } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';
import { BsPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { IconType } from 'react-icons';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { hostCheck, loginType, profileUpdate } from '../../Atom/userAtom';
import ModalButton from 'components/Modal/ModalButton';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const hostEditMode = useRecoilValue(hostCheck);
  const icons: { Icon: IconType | string; link: string; text: string }[] = [
    {
      Icon: hostEditMode ? BsPencilFill : BsPatchCheckFill,
      link: hostEditMode ? '/mypage/host/edit' : '/mypage/host',
      text: hostEditMode ? 'Host수정' : 'Host 등록',
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
  ];
  const [modal, setModal] = useState<boolean>(false);
  const resetLoginType = useResetRecoilState(loginType);
  const resetProfileUpload = useResetRecoilState(profileUpdate);
  const navigate = useNavigate();

  const handleEdit = () => navigate('profileEdit');

  const isOpen = () => setModal(!modal);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('memberId');
    localStorage.removeItem('nickname');
    resetLoginType();
    resetProfileUpload();
    navigate('/');
    alert('로그아웃 되었습니다.👋');
  };

  return (
    <div className="relative h-screen">
      <Header title={'마이페이지'} back={false} icon={''} />
      <div className="relative">
        <div className="flex text-center flex-col flex-grow gap-4 mx-4 my-6">
          <Profile page={true} />
          <button className="profileEdit" onClick={handleEdit}>
            프로필 수정
          </button>

          <MypageTab name={'내가 작성한 글'} link={'/mypage/mywrite'} />
          <MypageTab name={'즐겨찾기'} link={'/mypage/favorite'} />
          <div className="line" />

          <ul className="flex flex-grow-[0.7] items-center justify-center">
            {icons.map(({ Icon, link, text }, index) => (
              <li key={index} className="flex items-center justify-center">
                {index <= 1 ? (
                  <Link to={link} className="flex flex-col items-center p-3">
                    <Icon className={`w-11 h-11 mb-1 ${index ? '' : hostEditMode ? 'w-9 h-10 text-black' : 'text-main-color'}`} />
                    <p>{text}</p>
                  </Link>
                ) : (
                  <button type="button" name={text} className="p-3" onClick={isOpen}>
                    <div className="flex flex-col items-center pointer-events-none">
                      <Icon className="w-12 h-12 mb-1" />
                      <p>{text}</p>
                    </div>
                  </button>
                )}
                {index !== icons.length - 1 && <span className="w-[1px] h-10 mx-5 bg-gray-500"></span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {modal && <ModalButton title="로그아웃 하시겠습니까?" button="로그아웃" setModal={setModal} handleButton={logout} />}
    </div>
  );
};

export default MyPage;
