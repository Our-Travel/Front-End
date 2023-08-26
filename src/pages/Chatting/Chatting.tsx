import React, { useState, useRef, ReactElement, useEffect } from 'react';
import ChattingHeader from '../../components/Header/ChattingHeader';
import Header from '../../components/Header/Header';
import { CiMenuKebab } from 'react-icons/ci';
import FriendChat from './../../components/Chatting/FriendChat';
import MeChat from './../../components/Chatting/MeChat';
import { Client, CompatClient, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useRecoilValue } from 'recoil';
import { boardItem, chattingenter } from '../../Atom/atom';
import { useNavigate } from 'react-router-dom';

interface MessageDto {
  member_id: number;
  nickname: string;
  message: string;
  created_date: string;
  // Add other properties if needed
}

const Chatting = () => {
  const navigation = useNavigate();
  const chatEnter = useRecoilValue(chattingenter);
  const chatlist = chatEnter && chatEnter.data.data.chat_room_message_dto_list;
  const item = useRecoilValue(boardItem);
  const token = localStorage.getItem('token');
  const icon = <CiMenuKebab />;
  const sendText = useRef<HTMLInputElement>(null);
  let mainChat = useRef<HTMLDivElement>(null);
  console.log(mainChat);
  // 웹소켓 테스트
  const client = useRef<CompatClient>();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const connectHandler = () => {
    const headers = {
      Authorization: token,
    };
    client.current = Stomp.over(() => {
      const sock = new SockJS('https://ourtravel.site/api/dev/ws/chat');
      return sock;
    });
    client.current.connect(headers, () => {
      client.current?.subscribe('/sub/message/' + chatEnter.data.data.chat_room_id, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };
  const sendHandler = () => {
    if (inputMessage.trim() === '') {
      alert('메시지를 입력해주세요!');
      return;
    }
    client.current?.send(
      '/pub/message',
      {},
      JSON.stringify({
        room_id: item.board_id,
        writer_nickname: item.writer,
        message: inputMessage,
      })
    );
    setInputMessage('');
  };
  useEffect(() => {
    if (chatEnter && chatEnter.status === 200 && item) {
      connectHandler();
    }
  }, [chatEnter]);

  return (
    <div>
      <Header title={'상대 유저 아이디'} back={true} icon={icon} />
      <div className="w-full h-full">
        <div className="text-[#FF626F] pt-2 pb-2 text-sm">{chatEnter && chatEnter.data.msg}</div>
        <div className="main-chat mx-2.5 overflow-y-auto h-screen pb-60" ref={mainChat}>
          {chatlist && messages && (
            <div>
              {chatlist.map((message: MessageDto, index: number) => (
                <div key={index}>{message.member_id === 2 ? <FriendChat nickName={message.nickname} content={message.message} /> : <MeChat content={message.message} />}</div>
              ))}
              {messages.map((message: any, index: number) => (
                <div key={index}>{message.writer_id === chatlist.member_id ? <FriendChat nickName={message.writer_nickname} content={message.message} /> : <MeChat content={message.message} />}</div>
              ))}
            </div>
          )}
        </div>
        <div className="insert-box sticky bottom-14 h-14 flex">
          <input
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            type="text"
            className="grow m-3 rounded bg-[#f2f2f2]"
            id="chattext"
            name="chatinput"
            placeholder=""
            ref={sendText}
            value={inputMessage}
          />
          <button onClick={sendHandler} id="sendbtn">
            <img src="/sendButton.svg" alt="메세지 전송버튼" className="mr-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
