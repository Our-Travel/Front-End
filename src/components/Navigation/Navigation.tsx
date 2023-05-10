import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { GrLocation } from 'react-icons/gr';
import { TiMessages } from 'react-icons/ti';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';

const Navigation = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate('/main');
  };
  const chat = () => {
    navigate('/chatting');
  };
  const map = () => {
    navigate('/map');
  };
  const info = () => {
    navigate('/info');
  };
  const mypage = () => {
    navigate('/mypage');
  };

  return (
    <div className="absolute bg-white w-full h-14 bottom-0 z-50 box-border">
      <ul className="flex w-full justify-around relative top-[50%] translate-y-[-50%]">
        <li className="cursor-pointer  " onClick={home}>
          <GrHomeRounded className="w-5 h-5 outline-orange-300" />
        </li>
        <li className="cursor-pointer  " onClick={chat}>
          <TiMessages className="w-6 h-6" />
        </li>
        <li className="cursor-pointer  " onClick={map}>
          <GrLocation className="w-6 h-6" />
        </li>
        <li className="cursor-pointer  " onClick={info}>
          <HiOutlineInformationCircle className="w-6 h-6" />
        </li>
        <li className="cursor-pointer  " onClick={mypage}>
          <BiUser className="w-6 h-6" />
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Navigation;
