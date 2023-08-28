import React, { MouseEvent } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Spinner from '../../shared/Spinner';

interface hostTitle {
  title: any;
}
interface listInfo {
  member_id: number;
  nick_name: string;
  hash_tag: string;
  // host_profile_image: string;
}

const HostList = ({ title }: hostTitle) => {
  const [hosts, setHosts] = useState<listInfo[]>([]);
  const [numberId, setNumberId] = useState<number | null>(null);
  const navigate = useNavigate();
  const buttonClick = () => {
    // navigate('/main/selectLocation');
    navigate('/main');
  };

  useEffect(() => {
    const hostData = async () => {
      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts/list?regionCode=11`;
        const response = await axios.get(url);
        setHosts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    hostData();
  }, []);

  const idCheck = (id: number) => {
    setNumberId(numberId === id ? null : id);
  };

  return (
    <>
      {/* <Header title={title} back={true} icon={''} /> */}
      <div className="block w-[450px] border-b-2 border-gray-300">
        <h2 className="text-2xl inline-block pl-6 pt-2">서울시</h2>
        <button onClick={buttonClick}>
          <GrFormPrevious className="text-4xl inline-block relative right-60 bottom-1" />
        </button>
      </div>
      <div className="h-[85%] overflow-y-auto">
        {hosts.length ? (
          <ul className=" grid grid-cols-2 gap-4 p-4">
            {hosts.map((list) => (
              <li key={list.member_id} id={list.nick_name} className="w-full h-56 flex flex-col justify-center gap-1 p-3 border">
                {/* 테스트용 이미지 넣어둠 <img src={list.host_profile_image} alt="호스트 프로필 이미지" /> */}
                <img src="/assets/Ellipse 40.png" className="w-20 h-20 mx-auto" alt="호스트 기본 이미지" />
                <span>{list.nick_name}</span>
                <div className="h-24 text-main-color">
                  <span className={`line-clamp-2 ${list.member_id === numberId && 'block'}`}>{list.hash_tag}</span>
                  {list.hash_tag.length > 23 && (
                    <button type="button" id={list.nick_name} className="text-gray-600" onClick={() => idCheck(list.member_id)}>
                      {list.member_id === numberId ? '닫기' : '더보기'}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full absolute centerPosition flex flex-col items-center justify-center gap-4 text-lg">
            <img src="/assets/MyWriteImg.svg" alt="Host가 없는 지역 보라색 캐릭터 알림" />
            <p>해당지역에 등록된 Host가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HostList;
