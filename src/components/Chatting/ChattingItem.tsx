import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { chatMessages } from '../../Atom/atom';

const ChattingItem = () => {
  const [chatList, setChatList] = useState([]);
  console.log(chatList);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('https://ourtravel.site/api/dev/room', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setChatList(res.data.data);
        }
      });
  }, []);
  return (
    <div>
      {chatList &&
        chatList.map(({ room_id, writer, latest_message, latest_message_time }, index) => (
          <Link to={`/${room_id}`} key={index}>
            <ChattingComponent key={index} nickName={writer} content={latest_message} time={latest_message_time} />
          </Link>
        ))}
    </div>
  );
};

export default ChattingItem;
