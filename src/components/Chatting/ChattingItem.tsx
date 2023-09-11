import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { chatMessages } from '../../Atom/atom';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';

const ChattingItem = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [trash, setTrash] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [checkRoom, setCheckRoom] = useState<string>('');
  const [checkedRooms, setCheckedRooms] = useState<string[]>([]); // 선택한 채팅방의 room_id를 저장하는 배열

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('https://ourtravel.site/api/dev/room', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setChatList(res.data.data);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  // const deleteChatting = () => {
  //   if (checked !== null && checked && checkRoom) {
  //     axios
  //       .delete(`https://ourtravel.site/api/dev/room/${checkRoom}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   }
  // };
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
      const roomIdsQueryString = checkedRooms.join(',');
      axios
        .delete(`https://ourtravel.site/api/dev/room/${roomIdsQueryString}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          // 나가기 요청 성공 후, 선택한 방 목록을 초기화하거나 다른 작업 수행
          setCheckedRooms([]);
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <Header title="채팅목록" back={false} icon={''} />
        <BsTrash
          className="absolute right-0 w-10 h-5 cursor-pointer"
          onClick={() => {
            setTrash(!trash);
          }}
        />
      </div>
      {chatList.length !== 0 &&
        chatList.map(({ room_id, writer, latest_message, latest_message_time }, index) => (
          <div className="flex border-b-[1px] justify-center" key={index}>
            <label
              htmlFor={`room${index}`}
              onClick={() => {
                navigate(`/chatting/${room_id}`);
              }}
            >
              <ChattingComponent key={index} nickName={writer} content={latest_message} time={latest_message_time} />
            </label>
            {trash && (
              <input
                id={`room${index}`}
                type="radio"
                value={room_id}
                // onChange={(e) => {
                //   setChecked(e.target.checked);
                //   if (e.target.checked) {
                //     setCheckRoom(e.target.value);
                //   }
                // }}
                checked={checkedRooms.includes(room_id)}
                onChange={() => toggleRoomSelection(room_id)}
              />
            )}
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
