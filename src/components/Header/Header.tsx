import { SlArrowLeft } from 'react-icons/sl';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import exp from 'constants';
import ChattingModal from '../Modal/ChattingModal';
import { BsPencilSquare } from 'react-icons/bs';
import useLoginCheck from '../../hooks/useLoginCheck';

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

  //로그인 되어있는지 확인하는 커스텀 훅
  const loginCheck = useLoginCheck();

  useEffect(() => {
    if (lastPath === 'board') {
      setWriteBoard(true);
    } else {
      setWriteBoard(false);
    }
  }, [lastPath]);

  const handleGoBack = () => {
    const isLoggedIn = loginCheck();
    if (lastPath === 'board') {
      if (isLoggedIn) {
        navigate('/board/writeboard');
      }
    } else {
      window.history.back();
    }
  };

  const handleButtonClick = () => {
    const isLoggedIn = loginCheck();
    if (lastPath == 'board') {
      if (isLoggedIn) {
        navigate('/board/chattinglist');
      }
    }
    if (lastPath == 'chatting') {
      const isOpen = () => setModal(!modalOpen);
      isOpen();
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
        {writeBoard && (
          <button type="button" className="absolute left-1 px-2 py-2" onClick={handleGoBack}>
            <BsPencilSquare />
          </button>
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
        {icon && (
          <button type="button" className="absolute right-1 px-2 py-2" onClick={handleButtonClick}>
            {icon}
          </button>
        )}
      </header>
      <ChattingModal open={modalOpen} close={setModal} />
    </>
  );
};

export default Header;
