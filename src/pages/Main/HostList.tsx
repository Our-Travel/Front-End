import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../shared/Spinner';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { hostRoomId } from 'Atom/userAtom';

interface listInfo {
  member_id: number;
  nick_name: string;
  hash_tag: string;
  // host_profile_image: string;
}

const HostList = () => {
  const [hosts, setHosts] = useState<listInfo[]>([]);
  const [roomCheck, setRoomCheck] = useState<boolean>(false);
  const [hostMsg, setHostMsg] = useState<string>('');
  const [numberId, setNumberId] = useState<number | null>(null);
  const [roomId, setRoomId] = useRecoilState(hostRoomId);
  const { regionCode, regionName } = useParams();
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  useEffect(() => {
    const hostData = async () => {
      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts/list?regionCode=${regionCode}`;
        const response = await axios.get(url, config);
        console.log(response);
        setHosts(response.data.data);
        response.data.data.forEach((el: any) => setRoomCheck(el.chat_room_exist));
      } catch (error) {
        if (axios.isAxiosError(error)) setHostMsg(error.response?.data.msg);
      }
    };
    hostData();
  }, [roomCheck]);

  // 채팅방 유무에 따른 생성 및 입장
  const hostChatting = async (memberId: number) => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/room/host/${memberId}`;
      // 기존에 채팅방이 없으면 생성 post, 있으면 채팅방 입장
      if (!roomCheck) {
        const createRes = await axios.post(url, {}, config);
        console.log(createRes);
        chatEnter(createRes.data.data.chat_room_id);
        setRoomId(createRes.data.data.chat_room_id);
      } else {
        console.log(roomId);
        chatEnter(roomId);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  // 채팅방 입장 get
  const chatEnter = async (room_id: number) => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/room/${room_id}`;
      const response = await axios.get(url, config);
      alert(response.data.msg);
      navigate(`/chatting/${room_id}`);
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  // 해시태그가 많을 경우 더보기 닫기 생략하는 토글 (해시태그가 생각보다 많을 경우 생각해보기 -> 해시태그 개수 제한)
  const idCheck = (id: number) => {
    setNumberId(numberId === id ? null : id);
  };

  return (
    <>
      <Header title={regionName} back={true} icon={''} />
      <div className="h-[85%] overflow-y-auto">
        {hosts.length ? (
          <ul className="grid grid-cols-2 gap-4 p-4">
            {hosts.map((list) => (
              <li key={list.member_id} id={list.nick_name} className="w-full h-auto flex flex-col justify-center gap-1 p-3 border hover:bg-gray-100 cursor-pointer" onClick={() => hostChatting(list.member_id)}>
                {/* 테스트용 이미지 넣어둠 <img src={list.host_profile_image} alt="호스트 프로필 이미지" /> */}
                <img src="/assets/Ellipse 40.png" className="w-20 h-20 mx-auto" alt="호스트 기본 이미지" />
                <span>{list.nick_name}</span>
                <div className={`${list.member_id === numberId && 'h-24'} text-main-color`}>
                  <span className={`line-clamp-2 ${list.member_id === numberId && 'block'}`}>{list.hash_tag}</span>
                  {/* hash_tag 생략해도 너무 많아질 경우 레이아웃 깨지는 관계로 #의 개수 및 글자 수 제한 지정해보기  */}
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
            <img src="/assets/MyWriteImg.svg" alt="등록된 Host가 없는 지역 보라색 캐릭터 이미지" />
            <p>{hostMsg}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HostList;
