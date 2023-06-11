import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, serUserEmail] = useState<string>('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/mypage', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setUserName(res.data.data.nickName);
        serUserEmail(res.data.data.username);
      });
  }, []);

  return (
    <div className="w-[25rem] mx-auto flex flex-row items-center gap-3">
      <img src="/assets/profile.svg" alt="마이페이지 프로필사진 캐릭터" />
      <div className="text-left">
        <h2>{userName}</h2>
        <p className="mt-1">{userEmail}</p>
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
