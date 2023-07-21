import { SlArrowLeft } from 'react-icons/sl';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ChattingModal from '../Modal/ChattingModal';
import { BsPencilSquare } from 'react-icons/bs';
import { useResetRecoilState } from 'recoil';
import { token } from '../../Atom/atom';

interface header {
  title: string;
  back: boolean;
  icon: React.ReactNode;
}

const Header = ({ title, back, icon }: header) => {
  const navigate = useNavigate();
  const [modalOpen, setModal] = useState<boolean>(false);
  const currentURL = window.location.pathname;
  const lastPath = currentURL.substring(currentURL.lastIndexOf('/') + 1);
  const [writeBoard, setWriteBoard] = useState(false);
  const resetToken = useResetRecoilState(token);

  useEffect(() => {
    if (lastPath === 'board') {
      setWriteBoard(true);
    } else {
      setWriteBoard(false);
    }
  }, [lastPath]);

  const handleGoBack = () => {
    if (lastPath === 'board') {
      navigate('/board/writeboard');
    } else {
      window.history.back();
    }
  };

  const handleButtonClick = () => {
    if (lastPath == 'board') {
      navigate('/board/chattinglist');
    }
    if (lastPath == 'chatting') {
      const isOpen = () => setModal(!modalOpen);
      isOpen();
    }
  };

  const logout = () => {
    resetToken();
    localStorage.removeItem('token');
    navigate('/');
    alert('로그아웃 되었습니다.👋');
  };

  return (
    <>
      <header className="flex justify-center items-center text-2xl py-3 border-b border-gray-200">
        {back && (
          <button type="button" className="absolute left-1 px-2 py-2" onClick={handleGoBack}>
            <SlArrowLeft />
          </button>
        )}
        {writeBoard && (
          <button type="button" className="absolute left-1 px-2 py-2" onClick={handleGoBack}>
            <BsPencilSquare />
          </button>
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
        {title === '메인' && (
          <button type="button" onClick={logout} className="absolute right-2 py-1 px-2 border border-black rounded-md text-sm hover:bg-main-color hover:text-white hover:border-none">
            로그아웃
          </button>
        )}
        <button type="button" className="absolute right-1 px-2 py-2" onClick={handleButtonClick}>
          {icon}
        </button>
      </header>
      <ChattingModal open={modalOpen} close={setModal} />
    </>
  );
};

export default Header;
