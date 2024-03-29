import React, { useState, useRef, ReactElement, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { CiMenuKebab } from 'react-icons/ci';
import { SlArrowLeft } from 'react-icons/sl';
import FriendChat from './../../components/Chatting/FriendChat';
import MeChat from './../../components/Chatting/MeChat';
import { CompatClient, Stomp, StompConfig } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';
import regions from 'util/region';
import { debug } from 'console';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

interface MessageDto {
  member_id: number;
  nickname: string;
  message: string;
  created_date: string;
  profile_image: string;
}
interface ChatMessage {
  created_date: string;
  member_id: number;
  message: string;
  nickname: string;
  profile_image: string;
}
interface ApiResponse {
  result_code: 'S' | 'F';
  msg: string;
  data: {
    chat_room_id: number;
    chat_room_message_dto_list: ChatMessage[];
    my_member_id: number;
    region_code: number;
    room_manager: string;
    room_title: string;
  };
}

const Chatting = () => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const [chatEnter, setChatEnter] = useState<ApiResponse>();
  const chatlist = chatEnter?.data.chat_room_message_dto_list;
  const token = localStorage.getItem('token');
  const nickName = localStorage.getItem('nickname');
  const sendText = useRef<HTMLInputElement>(null);
  let mainChat = useRef<HTMLDivElement>(null);
  const regionCheck = regions.filter((el) => el.value === chatEnter?.data.region_code);
  const regionName = regionCheck.map((el) => el.key);
  const chatTitle = chatEnter?.data.room_title ?? '채팅방';

  // 웹소켓 테스트
  const client = useRef<CompatClient>();
  const [inputMessage, setInputMessage] = useState('');
  const debounceMessage = useDebounce(inputMessage, 1000);
  const [messages, setMessages] = useState<string[]>([]);
  const { roomnum } = useParams();

  // 웹소켓 연결 함수
  const connectHandler = () => {
    const headers = {
      Authorization: token,
    };
    client.current = Stomp.over(() => {
      const sock = new SockJS(`${process.env.REACT_APP_REST_API_SERVER}/ws/chat`);
      return sock;
    });
    console.log = () => {};

    client.current.connect(headers, () => {
      client.current?.subscribe('/sub/message/' + chatEnter?.data.chat_room_id, (message) => {
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
        room_id: roomnum,
        writer_nickname: nickName,
        message: inputMessage,
        created_date: new Date(),
      })
    );
    scrollToBottom();
    setInputMessage('');
  };
  useEffect(() => {
    sendText.current?.focus();
    axios
      .get(`${process.env.REACT_APP_REST_API_SERVER}/room/${roomnum}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setChatEnter(res.data);
        } else {
          alert('에러가 발생하였습니다');
        }
      });
  }, [roomnum, token]);

  const scrollToBottom = () => {
    if (mainChat.current) {
      const { scrollHeight, clientHeight } = mainChat.current;
      mainChat.current.scrollTop = scrollHeight - clientHeight;
    }
  };
  const activeEnter = (e: any) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return;
      sendHandler();
    }
  };
  // 디바운스 훅 넣어보기
  // useEffect(() => {}, []);
  // 다른 페이지 이동시 웹소켓 연결 끊기
  useEffect(() => {
    if (chatEnter) {
      scrollToBottom();
      connectHandler();
    }
    return () => {
      if (client.current) {
        client.current.disconnect();
      }
    };
  }, [chatEnter, messages]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="h-full">
      <header className="relative flex justify-center items-center text-2xl py-3 border-b w-full border-gray-200">
        <button type="button" className="absolute left-1 px-2 py-2" onClick={handleGoBack}>
          <SlArrowLeft />
        </button>
        <h2 className={`${chatTitle.length > 20 ? 'text-base' : 'text-lg'} font-semibold cursor-default`}>
          {chatEnter?.data.room_manager ? `[${m(regionName[0])}] ${chatEnter?.data.room_manager}${m('SIR')} ${m('CHATROOM')}` : chatEnter?.data.room_title}
        </h2>
      </header>
      <div className="w-full h-[calc(100%-8rem)] overflow-hidden">
        <div className="text-[#FF626F] pt-2 pb-2 text-sm">{chatEnter && chatEnter.msg}</div>
        <div className="main-chat h-[calc(100%-5rem)] mx-2.5 overflow-y-auto" ref={mainChat}>
          {chatlist && messages && (
            <div>
              {chatlist.map((message: MessageDto, index: number) => (
                <div key={index}>
                  {message.nickname === nickName ? (
                    <MeChat content={message.message} time={message.created_date} />
                  ) : (
                    <div>
                      {message.nickname === 'admin' ? (
                        <span className="text-main-color block mt-3">{message.message}</span>
                      ) : (
                        <FriendChat nickName={message.nickname} content={message.message} time={message.created_date} image={message.profile_image} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {chatEnter &&
            messages.length !== 0 &&
            messages.map((message: any, index: number) => (
              <div key={index}>
                {nickName === message.writer_nickname ? (
                  <MeChat content={message.message} time={message.created_date} />
                ) : (
                  <div>
                    {message.writer_nickname === 'admin' ? (
                      <span className="text-main-color block mt-3">{message.message}</span>
                    ) : (
                      <FriendChat nickName={message.nickname} content={message.message} time={message.created_date} image={message.profile_image} />
                    )}
                  </div>
                )}
              </div>
            ))}

          <div ref={mainChat} />
        </div>
        <div className="absolute bottom-16 flex w-full">
          <input
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            onKeyDown={(e) => activeEnter(e)}
            type="text"
            className="grow m-3 rounded bg-[#f2f2f2]"
            id="chattext"
            name="chatinput"
            placeholder=""
            ref={sendText}
            value={inputMessage}
          />
          <button onClick={sendHandler} id="sendbtn">
            <img src="/assets/sendButton.svg" alt="메세지 전송버튼" className="mr-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
