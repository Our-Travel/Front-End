import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';

// host 채팅 테스트
const ChattingItem = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const chatList = async () => {
      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/room`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);
        setChatList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    chatList();
  }, []);

  console.log(chatList);

  return (
    <ul className="relative">
      {chatList.map(({ room_id, room_title, writer, read_at, latest_message_time, latest_message }) => (
        <Link to={`/chatting/${room_id}`} key={room_id}>
          <ChattingComponent writer={writer} latest_message={latest_message} time={latest_message_time} />
        </Link>
      ))}
    </ul>
  );
};

export default ChattingItem;
