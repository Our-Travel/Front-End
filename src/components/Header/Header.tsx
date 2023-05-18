import { SlArrowLeft } from 'react-icons/sl';
import React from 'react';
import { useNavigate } from 'react-router';
import exp from 'constants';

interface header {
  title: string;
  back: boolean;
  icon: React.ReactNode;
}

const Header = ({ title, back, icon }: header) => {
  const navigate = useNavigate();
  const currentURL = window.location.pathname;
  const lastPath = currentURL.substring(currentURL.lastIndexOf('/') + 1);

  const handleButtonClick = () => {
    if (lastPath == 'board') {
      navigate('/board/chattinglist');
    }
  };

  return (
    <header className="flex justify-center items-center text-2xl py-3 border-b border-gray-200">
      {back && (
        <button type="button" className="absolute left-1 px-2 py-2">
          <SlArrowLeft />
        </button>
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
      <button type="button" className="absolute right-1 px-2 py-2" onClick={handleButtonClick}>
        {icon}
      </button>
    </header>
  );
};

export default Header;
