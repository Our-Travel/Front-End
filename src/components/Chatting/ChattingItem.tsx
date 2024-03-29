import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';
import axios from 'axios';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';
import EmptyPage from 'shared/EmptyPage';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const ChattingItem = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<any[]>([]);
  const chatNickName = localStorage.getItem('nickname');
  const [trash, setTrash] = useState<boolean>(false);
  const [checkedRooms, setCheckedRooms] = useState<string[]>([]);
  const [exitUser, setExitUser] = useState('');
  const token = localStorage.getItem('token');
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  useEffect(() => {
    // 채팅방 목록 불러오기
    axios
      .get(`${process.env.REACT_APP_REST_API_SERVER}/room`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
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
            setExitUser(res.data.msg);

            alert(res.data.msg);
            setTrash(!trash);
          })
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <div>
      <div className="flex w-full">
        <Header title={'CHATLIST'} back={false} icon={''} />
        {chatList.length > 0 && (
          <BsTrash
            className="absolute w-10 h-5 top-4 cursor-pointer right-1 transition-transform hover:scale-125"
            onClick={() => {
              setTrash(!trash);
            }}
          />
        )}
      </div>
      {chatList.length > 0 ? (
        chatList.map(({ room_id, writer, latest_message, latest_message_time, room_title, region_code, room_manager }, index) => {
          const isSameUser = room_manager && chatNickName === room_manager;
          return (
            <div className="w-full flex justify-between border-b-[1px]" key={index}>
              <label className="w-[95%]" htmlFor={`room${index}`} onClick={() => navigate(`/chatting/${room_id}`)}>
                <ChattingComponent key={index} writer={writer} room_title={room_title} latest_message={latest_message} region_code={region_code} time={latest_message_time} room_manager={room_manager} />
              </label>
              {trash && <input className="mr-3 focus:outline-none" id={`room${index}`} type="checkbox" value={room_id} checked={checkedRooms.includes(room_id)} disabled={isSameUser} onChange={() => toggleRoomSelection(room_id)} />}
            </div>
          );
        })
      ) : (
        <EmptyPage alt={'채팅목록 보라색 캐릭터'} content={'NOCHAT'} subContent={'NOSUB'} />
      )}
      {trash && (
        <>
          <button onClick={deleteChatting} className="absolute bottom-20 left-1/2 -translate-x-[50%] bg-main-color w-3/4 h-10 rounded-lg text-white">
            {m('OUT')}
          </button>
        </>
      )}
    </div>
  );
};

export default ChattingItem;
