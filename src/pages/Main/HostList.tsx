import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../shared/Spinner';
import { AiOutlineConsoleSql } from 'react-icons/ai';

interface listInfo {
  member_id: number;
  nick_name: string;
  hash_tag: string;
  // host_profile_image: string;
}

const HostList = () => {
  const [hosts, setHosts] = useState<listInfo[]>([]);
  const [hostMsg, setHostMsg] = useState<string>('');
  const [numberId, setNumberId] = useState<number | null>(null);
  const { regionCode, regionName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const hostData = async () => {
      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts/list?regionCode=${regionCode}`;
        const response = await axios.get(url);
        console.log(response);
        setHosts(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) setHostMsg(error.response?.data.msg);
      }
    };
    hostData();
  }, []);

  // 채팅방 생성 및 입장
  const hostChatting = async (memberId: number) => {
    const url = `${process.env.REACT_APP_REST_API_SERVER}/room`;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      // 채팅방 생성 post통신
      const createRes = await axios.post(`${url}/host/${memberId}`, {}, config);
      const roomId = createRes.data.data.chat_room_id;
      console.log(createRes);

      // 채팅방이 생성되면 채팅방 입장 get통신
      const enterRes = await axios.get(`${url}/${roomId}`, config);
      alert(enterRes.data.msg);
      navigate(`/chatting/${roomId}`);
      console.log(enterRes);
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
