import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useState, useEffect, MouseEvent } from 'react';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';

interface listInfo {
  member_id: number;
  nick_name: string;
  hash_tag: string;
  host_profile_image: string;
}

const HostList = () => {
  const [hosts, setHosts] = useState<listInfo[]>([]);
  const [roomId, setRoomId] = useState<null | number>();
  const [numberId, setNumberId] = useState<number | null>(null);
  const { regionCode, regionName } = useParams();
  const navigate = useNavigate();
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

  // 해당 지역별로 등록된 host목록 표시
  useEffect(() => {
    const hostData = async () => {
      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts/list?regionCode=${regionCode}`;
        const response = await axios.get(url, config);
        console.log(response);
        setHosts(response.data.data);
        response.data.data.forEach((el: any) => setRoomId(el.chat_room_id));
      } catch (error) {
        if (axios.isAxiosError(error)) console.log(error);
      }
    };
    hostData();
  }, [roomCheck]);

  console.log(roomId);

  // roomId 유무에 따른 채팅방 생성 및 입장
  const hostChatting = async (memberId: number, nickName: string) => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/room/host/${memberId}`;
      // roomId가 null 이면 채팅방 생성 후 입장
      if (!roomId) {
        const createRoom = await axios.post(url, {}, config);
        console.log(createRoom.data.msg);
        chatEnter(createRoom.data.data.chat_room_id);
      } else if (roomId && localStorage.getItem('nickname') === nickName) {
        // roomId가 있는 경우 본인이 등록한 host도 자신의 채팅방을 들어가지게 되는데 이 부분에서 2개이상의 채팅방의 유저와 대화할 경우 roomId가 마지막 채팅방으로 덮어짐
        // 조건을 주고 어차피 host 채팅방 특성상 대화를 유저가 먼저 하기때문에 host는 채팅을 확인하려면 채팅목록으로 가서 새로운 채팅 알림있으면 선택해서 입장하면됨
        alert('채팅목록으로 이동합니다.');
        navigate('/chattingList');
      } else {
        // roomId가 있고 host본인이 아닌경우는 기존에 가지고있던 roomId로 입장
        chatEnter(roomId);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        alert(error.response?.data.msg);
      }
    }
  };

  // 채팅방 입장 get
  const chatEnter = async (room_id: number) => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/room/${room_id}`;
      const response = await axios.get(url, config);
      console.log(response);
      alert(response.data.msg);
      navigate(`/chatting/${room_id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
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
              <li key={list.member_id} id={list.nick_name} className={`hostList ${list.member_id === numberId ? 'h-auto' : 'h-52'}`} onClick={() => hostChatting(list.member_id, list.nick_name)}>
                <div>
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
            <p>해당 지역에 등록된 host가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HostList;
