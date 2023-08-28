import { SlArrowLeft } from 'react-icons/sl';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import exp from 'constants';
import ChattingModal from '../Modal/ChattingModal';
import { BsPencilSquare } from 'react-icons/bs';

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
    if (lastPath == 'chattinglist') {
      navigate('/board/chattinglist/delete');
    }
    if (lastPath == 'delete') {
      // navigate('/board/chattinglist');
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
        <button type="button" className="absolute right-1 px-2 py-2" onClick={handleButtonClick}>
          {icon}
        </button>
      </header>
      <ChattingModal open={modalOpen} close={setModal} />
    </>
  );
};

export default Header;
