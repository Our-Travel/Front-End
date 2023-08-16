import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useResetRecoilState, useRecoilState } from 'recoil';
import { token } from '../../Atom/atom';
import { hostCheck, userInfo } from '../../Atom/userAtom';

export const Profile = () => {
  const [email, setEmail] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [hostActive, setHostActive] = useRecoilState(hostCheck);
  const resetToken = useResetRecoilState(token);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_REST_API_SERVER}/members`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setEmail(response.data.data.username);
        setNickName(response.data.data.nick_name);
        setHostActive(response.data.data.host_authority);
      })
      .catch((error) => {
        alert(`${error.response.data.msg}`);
        localStorage.removeItem('token');
        resetToken();
        navigate('/signin');
      });
  }, []);

  return (
    <div className="w-[25rem] mx-auto flex flex-row items-center gap-3">
      <img src="/assets/profile.svg" alt="마이페이지 프로필사진 캐릭터" />
      <div className="text-left">
        <div className="flex flex-row items-center gap-2">
          <p>{nickName}</p>
          {hostActive && <BsPatchCheckFill className="relative text-main-color" />}
        </div>
        <p className="mt-1">{email}</p>
      </div>
    </div>
  );
};

interface MyTab {
  name: string;
  link: string;
}

export const MypageTab = ({ name, link }: MyTab) => {
  return (
    <Link to={link} className="flex flex-row justify-between items-center w-[25rem] h-14 text-lg">
      <p>{name}</p>
      <MdArrowForwardIos className="w-5 h-5" />
    </Link>
  );
};
