import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { GrLocation } from 'react-icons/gr';
import { TiMessages } from 'react-icons/ti';
import { VscNote } from 'react-icons/vsc';
import { BiUser } from 'react-icons/bi';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path: string = location.pathname;

  function getName(currentPath: string, expectedPath: string): string {
    return currentPath.includes(expectedPath) ? 'active' : 'transition-transform hover:scale-125';
  }

  const main = () => {
    navigate('/main');
  };
  const board = () => {
    navigate('/board');
  };
  const chatting = () => {
    navigate('/chattinglist');
  };
  const map = () => {
    navigate('/map');
  };
  const mypage = () => {
    navigate('/mypage');
  };

  return (
    <>
      <div className="absolute bg-white w-full h-14 bottom-0 z-50 box-border">
        <ul className="flex w-full justify-around relative top-[50%] translate-y-[-50%] h-7">
          <li className={getName(path, '/main')} onClick={main}>
            <GrHomeRounded className="w-5 h-5 " />
          </li>
          <li className={getName(path, '/board')} onClick={board}>
            <VscNote className="w-6 h-6" />
          </li>
          <li className={getName(path, '/chattinglist')} onClick={chatting}>
            <TiMessages className="w-6 h-6" />
          </li>
          <li className={getName(path, '/map')} onClick={map}>
            <GrLocation className="w-6 h-6" />
          </li>
          <li className={getName(path, '/mypage')} onClick={mypage}>
            <BiUser className="w-6 h-6" />
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
