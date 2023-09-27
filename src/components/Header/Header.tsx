import { SlArrowLeft } from 'react-icons/sl';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ChattingModal from '../Modal/ChattingModal';
import useLoginCheck from '../../hooks/useLoginCheck';

interface header {
  title: string | undefined;
  back: boolean;
  icon: React.ReactNode;
}

const Header = ({ title, back, icon }: header) => {
  const navigate = useNavigate();
  const [modalOpen, setModal] = useState<boolean>(false);
  const currentURL = window.location.pathname;
  const lastPath = currentURL.substring(currentURL.lastIndexOf('/') + 1);

  //로그인 되어있는지 확인하는 커스텀 훅
  const loginCheck = useLoginCheck();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleButtonClick = () => {
    if (lastPath == 'chatting') {
      const isOpen = () => setModal(!modalOpen);
      isOpen();
    }
    if (lastPath == 'board') {
      const isLoggedIn = loginCheck();
      if (isLoggedIn) {
        navigate('/board/writeboard');
      }
    }
  };

  return (
    <>
      <header className="flex justify-center items-center text-2xl py-3 border-b border-gray-200">
        {back && (
          <button type="button" className="absolute left-1 px-2 py-2" onClick={handleGoBack}>
            <SlArrowLeft />
          </button>
        )}
        <h2 className="text-xl font-semibold cursor-default">{title}</h2>
        {icon && (
          <button type="button" className="absolute right-1 px-2 py-2 transition-transform hover:scale-125" onClick={handleButtonClick}>
            {icon}
          </button>
        )}
      </header>
      <ChattingModal open={modalOpen} close={setModal} />
    </>
  );
};

export default Header;
