import { SlArrowLeft } from 'react-icons/sl';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useLoginCheck from '../../hooks/useLoginCheck';

interface header {
  title: string | undefined;
  back: boolean;
  icon: React.ReactNode;
}

const Header = ({ title = '채팅방 제목' || undefined, back, icon }: header) => {
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
    if (lastPath == 'board') {
      const isLoggedIn = loginCheck();
      if (isLoggedIn) {
        navigate('/board/writeboard');
      }
    }
  };

  return (
    <>
      <header className="relative flex justify-center items-center text-2xl py-3 border-b w-full border-gray-200">
        {back && (
          <button type="button" className="absolute left-1 px-2 py-2" onClick={handleGoBack}>
            <SlArrowLeft />
          </button>
        )}
        <h2 className={`font-semibold cursor-default ${title?.length > 20 ? 'text-base' : 'text-xl'}`}>{title}</h2>
        {icon && (
          <button type="button" className="absolute right-1 px-2 py-2 transition-transform hover:scale-125" onClick={handleButtonClick}>
            {icon}
          </button>
        )}
      </header>
    </>
  );
};
export default Header;
