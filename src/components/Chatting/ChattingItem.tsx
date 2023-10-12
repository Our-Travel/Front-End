import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';
import axios from 'axios';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { exitChat } from '../../Atom/atom';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChattingItem = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [trash, setTrash] = useState<boolean>(false);
  const [checkedRooms, setCheckedRooms] = useState<string[]>([]);
  const [exitUser, setExitUser] = useRecoilState(exitChat);
  console.log(checkedRooms);
  const token = localStorage.getItem('token');
  const client = useRef<CompatClient>();

  // 삭제 탐지 테스트
  const [test, setTest] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get('https://ourtravel.site/api/dev/room', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         setChatList(res.data.data);
  //       }
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);
  useEffect(() => {
    // STOMP 클라이언트 초기화
    client.current = Stomp.over(() => {
      const sock = new SockJS('https://ourtravel.site/api/dev/ws/chat');
      return sock;
    });

    // STOMP 클라이언트 연결
    client.current.connect({}, () => {
      console.log('STOMP 연결됨');

      // STOMP를 사용하여 /topic/user_exit 주제를 구독
      client.current?.subscribe('/topic/user_exit', (message) => {
        // 유저가 나갔을 때의 이벤트 처리
        const exitMessage = JSON.parse(message.body).message;
        setExitUser(exitMessage);
      });
    });

    // 채팅방 목록 불러오기
    axios
      .get('https://ourtravel.site/api/dev/room', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setChatList(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [token, setExitUser, test]);

  const toggleRoomSelection = (room_id: string) => {
    // 이미 선택한 방인지 확인
    const isSelected = checkedRooms.includes(room_id);

    // 이미 선택한 방이면 선택 해제, 아니면 선택
    if (isSelected) {
      const updatedSelectedRooms = checkedRooms.filter((id) => id !== room_id);
      setCheckedRooms(updatedSelectedRooms);
    } else {
      setCheckedRooms([...checkedRooms, room_id]);
    }
  };

  const deleteChatting = () => {
    if (checkedRooms.length > 0) {
      // 선택한 방들을 나가는 요청 처리
      for (let i = 0; i < checkedRooms.length; i++) {
        const room_id = checkedRooms[i];
        axios
          .delete(`https://ourtravel.site/api/dev/room/${room_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            setExitUser(res.data.msg);

            // 탐지 test
            alert(res.data.msg);
            setTest(!test);
            setTrash(!trash);
          })
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <Header title="채팅목록" back={false} icon={''} />
        {chatList.length > 0 && (
          <BsTrash
            className="absolute right-0 w-10 h-5 cursor-pointer"
            onClick={() => {
              setTrash(!trash);
            }}
          />
        )}
      </div>
      {chatList.length !== 0 &&
        chatList.map(({ room_id, writer, latest_message, latest_message_time, image, room_title }, index) => (
          <div className="flex border-b-[1px] justify-center" key={index}>
            <label
              htmlFor={`room${index}`}
              onClick={() => {
                navigate(`/chatting/${room_id}`);
              }}
            >
              <ChattingComponent key={index} writer={writer} latest_message={latest_message} time={latest_message_time} room_title={room_title} image={image} />
            </label>
            {trash && <input id={`room${index}`} type="checkbox" value={room_id} checked={checkedRooms.includes(room_id)} onChange={() => toggleRoomSelection(room_id)} />}
            {trash && (
              <button onClick={deleteChatting} className="absolute bottom-20 left-1/2 -translate-x-[50%] bg-main-color w-[340px] h-[40px] rounded-lg text-white">
                나가기 버튼
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default ChattingItem;
