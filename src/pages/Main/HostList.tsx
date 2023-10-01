import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useState, useEffect, MouseEvent } from 'react';
import Spinner from '../../shared/Spinner';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { hostRoomId, roomList } from 'Atom/userAtom';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { RiContactsBookLine } from 'react-icons/ri';

interface listInfo {
  member_id: number;
  nick_name: string;
  hash_tag: string;
  host_profile_image: string;
}

const HostList = () => {
  const [hosts, setHosts] = useState<listInfo[]>([]);
  const [roomCheck, setRoomCheck] = useState<boolean>(false);
  const [hostMsg, setHostMsg] = useState<string>('');
  const [numberId, setNumberId] = useState<number | null>(null);
  const [roomId, setRoomId] = useRecoilState(hostRoomId);
  const { regionCode, regionName } = useParams();
  const navigate = useNavigate();
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

  useEffect(() => {
    const hostData = async () => {
      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts/list?regionCode=${regionCode}`;
        const response = await axios.get(url, config);
        setHosts(response.data.data);
        response.data.data.forEach((el: any) => setRoomCheck(el.chat_room_exist));
        console.log(response);
      } catch (error) {
        if (axios.isAxiosError(error)) setHostMsg(error.response?.data.msg);
      }
    };
    hostData();
  }, []);

  // 채팅방 유무에 따른 생성 및 입장 (새로고침 이슈)
  const hostChatting = async (memberId: number) => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/room/host/${memberId}`;
      // 기존에 채팅방이 없으면 생성 post, 있으면 채팅방 입장
      if (!roomCheck) {
        const createRes = await axios.post(url, {}, config);
        console.log(createRes);
        console.log(createRes.data.msg);
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  // 해시태그가 많을 경우 더보기 버튼 토글
  const idCheck = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setNumberId(numberId === id ? null : id);
  };

  return (
    <>
      <Header title={regionName} back={true} icon={''} />
      <div className="h-[85%] overflow-y-auto">
        {hosts.length ? (
          <ul className="grid grid-cols-2 gap-4 p-4">
            {hosts.map((list) => (
              <li key={list.member_id} id={list.nick_name} className={`hostList ${list.member_id === numberId ? 'h-auto' : 'h-52'}`}>
                <div onClick={() => hostChatting(list.member_id)}>
                  <img src={list.host_profile_image ? list.host_profile_image : '/assets/profile.svg'} className="w-20 h-20 mx-auto rounded-full" alt="호스트 기본 이미지" />
                  <span>{list.nick_name}</span>
                </div>
                <div className="border-t-[1px]">
                  <span className={`mt-1 line-clamp-2 text-blue-500 ${list.member_id === numberId && 'block'}`}>{list.hash_tag}</span>
                </div>
                {list.hash_tag.length > 25 && (
                  <button type="button" id={list.nick_name} className="hostListBtn" onClick={(e) => idCheck(e, list.member_id)}>
                    {list.member_id === numberId ? (
                      <>
                        닫기
                        <BiChevronUp className="w-6 h-6" />
                      </>
                    ) : (
                      <>
                        더보기
                        <BiChevronDown className="w-6 h-6" />
                      </>
                    )}
                  </button>
                )}
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
