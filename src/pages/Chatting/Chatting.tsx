import React, { useState, useRef, ReactElement, useEffect } from 'react';
import ChattingHeader from '../../components/Header/ChattingHeader';
import Header from '../../components/Header/Header';
import { CiMenuKebab } from 'react-icons/ci';
import FriendChat from './../../components/Chatting/FriendChat';
import MeChat from './../../components/Chatting/MeChat';
import { Client, CompatClient, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useRecoilValue } from 'recoil';
import { chattingenter } from '../../Atom/atom';
import { useNavigate, useParams } from 'react-router-dom';

const Chatting = () => {
  const chatEnter = useRecoilValue(chattingenter);
  const token = localStorage.getItem('token');
  const icon = <CiMenuKebab />;
  const [chattingText, setChattingText] = useState<string>('');
  const sendText = useRef<HTMLInputElement>(null);
  let mainChat = useRef(null);

  // 웹소켓 테스트
  const client = useRef<CompatClient>();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const connectHaner = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS('https://ourtravel.site/api/dev/ws/chat');
      return sock;
    });
    client.current.connect({}, () => {
      console.log('연결');
      client.current?.subscribe(
        '/sub/message/1',
        (message) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage.message]);
          console.log('Received Message:', newMessage);
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
    });
  };
  const sendHandler = () => {
    client.current?.send(
      '/pub/message',
      {},
      JSON.stringify({
        room_id: '1',
        writer_nickname: 'user',
        message: inputMessage,
      })
    );
    setSentMessages((prevSentMessages) => [...prevSentMessages, inputMessage]); // 보낸 메시지 목록에 추가
    setInputMessage('');
  };
  useEffect(() => {
    if (chatEnter && chatEnter.status === 200) {
      connectHaner();
    }
  }, [chatEnter]);

  return (
    <div>
      <Header title={'상대 유저 아이디'} back={true} icon={icon} />
      <div className="w-full h-full absolute">
        <div className="text-[#FF626F] pt-2 pb-2 text-sm">맷돌이님과 블루님이 채팅을 시작하였습니다.</div>
        <div className="main-chat h-[80%] mx-2.5" ref={mainChat}>
          <div>
            {messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
            {sentMessages.map((message, index) => (
              <div key={`sent_${index}`}>{message}</div>
            ))}
          </div>
          <FriendChat nickName={'맷돌이'} />
          <MeChat content={'아뇨! 비비고 교자만두 두개 남아있어요~!!'} />
          {chattingText.length > 0 && <MeChat content={chattingText} />}
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
