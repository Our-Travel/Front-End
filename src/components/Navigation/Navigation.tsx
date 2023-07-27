import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { GrLocation } from 'react-icons/gr';
import { TiMessages } from 'react-icons/ti';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import useLoginCheck from '../../hooks/useLoginCheck';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path: string = location.pathname;

  //로그인 되어있는지 확인하는 커스텀 훅
  const loginCheck = useLoginCheck();

  function getName(currentPath: string, expectedPath: string): string {
    return currentPath.includes(expectedPath) ? 'active' : 'navigationButton';
  }

  const main = () => {
    navigate('/main');
  };
  const chat = () => {
    navigate('/board');
  };
  const map = () => {
    navigate('/map');
  };
  const info = () => {
    navigate('/info');
  };
  const mypage = () => {
    const isLoggedIn = loginCheck();
    if (isLoggedIn) {
      navigate('/mypage');
    } else {
      navigate('/signin');
    }
  };

  return (
    <>
      <div className="absolute bg-white w-full h-14 bottom-0 z-50 box-border">
        <ul className="flex w-full justify-around relative top-[50%] translate-y-[-50%] h-7">
          <li className={getName(path, '/main')} onClick={main}>
            <GrHomeRounded className="w-5 h-5 " />
          </li>
          <li className={getName(path, '/board')} onClick={chat}>
            <TiMessages className="w-6 h-6" />
          </li>
          <li className={getName(path, '/map')} onClick={map}>
            <GrLocation className="w-6 h-6" />
          </li>
          <li className={getName(path, '/info')} onClick={info}>
            <HiOutlineInformationCircle className="w-6 h-6" />
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
