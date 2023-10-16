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
import axios from 'axios';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const MyPage = () => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const hostEditMode = useRecoilValue(hostCheck);
  const icons: { Icon: IconType | string; link: string; text: string }[] = [
    {
      Icon: hostEditMode ? BsPencilFill : BsPatchCheckFill,
      link: hostEditMode ? '/mypage/host/edit' : '/mypage/host',
      text: hostEditMode ? m('Host수정') : m('Host등록'),
    },
    {
      Icon: BiBell,
      link: '/mypage/notice',
      text: m('NOTICE'),
    },
    {
      Icon: MdLogout,
      link: '/',
      text: m('LOG_OUT'),
    },
  ];
  const [modal, setModal] = useState<boolean>(false);
  const resetLoginType = useResetRecoilState(loginType);
  const resetProfileUpload = useResetRecoilState(profileUpdate);
  const navigate = useNavigate();
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

  const handleEdit = () => navigate('profileEdit');

  const isOpen = () => setModal(!modal);

  const logout = async () => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/logout`;
      const response = await axios.delete(url, config);
      localStorage.removeItem('nickname');
      localStorage.removeItem('memberId');
      localStorage.removeItem('token');
      resetLoginType();
      resetProfileUpload();
      alert(response.data.msg);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        alert(error.response?.data.msg);
      }
    }
  };

  return (
    <div className="relative h-screen">
      <Header title={'MYPAGE'} back={false} icon={''} />
      <div className="relative">
        <div className="flex text-center flex-col flex-grow gap-4 mx-4 my-6">
          <Profile page={true} />
          <button className="profileEdit" onClick={handleEdit}>
            {m('PROFILE_EDIT')}
          </button>
          <MypageTab name={m('WRITTEN_BY_ME')} link={'/mypage/mywrite'} />
          <MypageTab name={m('FAVORITE')} link={'/mypage/favorite'} />
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
