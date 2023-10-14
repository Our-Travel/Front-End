import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';
import axios from 'axios';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';
import EmptyPage from 'shared/EmptyPage';

const ChattingItem = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<any[]>([]);
  const chatNickName = localStorage.getItem('nickname');
  const [trash, setTrash] = useState<boolean>(false);
  const [checkedRooms, setCheckedRooms] = useState<string[]>([]);
  const [exitUser, setExitUser] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // 채팅방 목록 불러오기
    axios
      .get(`${process.env.REACT_APP_REST_API_SERVER}/room`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setChatList(res.data.data);
        }
      })
      .catch((err) => console.log(err.message));
  }, [token, exitUser]);

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
    const exit = window.confirm('채팅방을 나가시겠습니까?');
    if (exit && checkedRooms.length > 0) {
      // 선택한 방들을 나가는 요청 처리
      for (let i = 0; i < checkedRooms.length; i++) {
        const room_id = checkedRooms[i];
        axios
          .delete(`${process.env.REACT_APP_REST_API_SERVER}/room/${room_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            setExitUser(res.data.msg);

            alert(res.data.msg);
            setTrash(!trash);
          })
          .catch((err) => console.error(err));
      }
    }
  };

  console.log(chatList);
  return (
    <div>
      <div className="flex justify-center items-center w-full">
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
      {chatList.length > 0 &&
        chatList.map(({ room_id, writer, latest_message, latest_message_time, room_title, region_code, room_manager, image }, index) => {
          const isSameUser = room_manager && chatNickName === writer;

          return (
            <div className="flex justify-between border-b-[1px]" key={index}>
              <label
                htmlFor={`room${index}`}
                onClick={() => {
                  navigate(`/chatting/${room_id}`);
                }}
              >
                <ChattingComponent key={index} writer={writer} room_title={room_title} latest_message={latest_message} region_code={region_code} time={latest_message_time} room_manager={room_manager} image={image} />
              </label>
              {trash && <input className="mr-3 focus:outline-none" id={`room${index}`} type="checkbox" value={room_id} checked={checkedRooms.includes(room_id)} disabled={isSameUser} onChange={() => toggleRoomSelection(room_id)} />}
            </div>
          );
        })}
      {trash && (
        <>
          <button onClick={deleteChatting} className="absolute bottom-20 left-1/2 -translate-x-[50%] bg-main-color w-[340px] h-[40px] rounded-lg text-white">
            나가기
          </button>
        </>
      )}
    </div>
  );
};

export default ChattingItem;
