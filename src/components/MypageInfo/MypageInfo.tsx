import React, { useEffect, useState } from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hostCheck, profileUpdate } from '../../Atom/userAtom';
import axios from 'axios';
import Spinner from 'shared/Spinner';

interface pageInfo {
  page: boolean;
}

interface userProfile {
  username: string;
  nick_name: string;
  image_path: string;
}

export const Profile = ({ page }: pageInfo) => {
  const [hostActive, setHostActive] = useRecoilState(hostCheck);
  const [data, setData] = useState<userProfile>({ username: '', nick_name: '', image_path: '' });
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
  const [loading, setLoading] = useState<boolean>(true);
  const update = useRecoilValue(profileUpdate);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_REST_API_SERVER}/members`, config)
      .then((res) => {
        setTimeout(() => {
          setData({
            username: res.data.data.username,
            nick_name: res.data.data.nick_name,
            image_path: res.data.data.image_path,
          });
          setHostActive(res.data.data.host_authority);
          setLoading(false);
        }, 150);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
        localStorage.removeItem('token');
        navigate('/signin');
      });
  }, [update]);

  return (
    <>
      <div className="w-[25rem] mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-row items-center gap-4">
            <img src={data.image_path || '/assets/profile.svg'} className={`${page ? 'w-20 h-20' : 'w-40 h-40 mx-auto shadow-lg'} rounded-full border border-gray-300`} alt="마이페이지 프로필사진" />
            {page && (
              <div className="text-left">
                <div className="flex flex-row items-center gap-2">
                  <p>{data.nick_name}</p>
                  {hostActive && <BsPatchCheckFill className="relative text-main-color" />}
                </div>
                <p className="mt-1">{data.username}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
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
