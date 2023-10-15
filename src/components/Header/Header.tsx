import { SlArrowLeft } from 'react-icons/sl';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useLoginCheck from '../../hooks/useLoginCheck';
import { langConvert } from 'Atom/atom';
import { useRecoilValue } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';

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
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

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
        <h2 className="text-xl font-semibold cursor-default">{m(title)}</h2>
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
