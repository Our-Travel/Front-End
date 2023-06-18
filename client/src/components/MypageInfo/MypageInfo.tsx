import axios from 'axios';
import { useEffect } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userLogin } from '../../recoil/loginAtom';

export const Profile = () => {
  const [userInfo, setUserInfo] = useRecoilState(userLogin);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/mypage', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setUserInfo({ email: res.data.data.username, nickName: res.data.data.nickName });
      });
  }, []);

  return (
    <div className="w-[25rem] mx-auto flex flex-row items-center gap-3">
      <img src="/assets/profile.svg" alt="마이페이지 프로필사진 캐릭터" />
      <div className="text-left">
        <h2>{userInfo.nickName}</h2>
        <p className="mt-1">{userInfo.email}</p>
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
