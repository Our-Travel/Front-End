import React, { useState, useRef, ReactElement } from 'react';
import ChattingHeader from '../../components/Header/ChattingHeader';
import Header from '../../components/Header/Header';
import { CiMenuKebab } from 'react-icons/ci';
import FriendChat from './../../components/Chatting/FriendChat';
import MeChat from './../../components/Chatting/MeChat';

const Chatting = () => {
  const icon = <CiMenuKebab />;
  const [chattingText, setChattingText] = useState<string>('');
  const [didSend, setDidSend] = useState<boolean>(false);
  const sendText = useRef<HTMLInputElement>(null);
  let mainChat = useRef(null);

  const sendChat = (event: any) => {
    // console.log(sendText.current?.value);

    setChattingText('');
    const chatText = sendText.current?.value!;
    if (chatText === '') {
      alert('내용을 입력해주세요.');
    }
    setDidSend(true);
    // console.log(chattingText);
    const htmlCode = `<MeChat content={${chatText}} />`;
    setChattingText(chatText);
    // return <div dangerouslySetInnerHTML={{ __html: htmlCode }}></div>;
  };

  return (
    <div>
      <Header title={'상대 유저 아이디'} back={true} icon={icon} />
      <div className="w-full h-full absolute">
        <div className="text-[#FF626F] pt-2 pb-2 text-sm">맷돌이님과 블루님이 채팅을 시작하였습니다.</div>
        <div className="main-chat h-[80%] mx-2.5" ref={mainChat}>
          <FriendChat nickName={'맷돌이'} />
          <MeChat content={'아뇨! 비비고 교자만두 두개 남아있어요~!!'} />
          {chattingText.length > 0 && <MeChat content={chattingText} />}
          {/* <div dangerouslySetInnerHTML={{ __html :' <MeChat content={chattingText} />' }}></div> */}
        </div>
        <div className="insert-box sticky bottom-14 h-14 flex">
          <input type="text" className="grow m-3 rounded bg-[#f2f2f2]" id="chattext" name="chatinput" placeholder="" ref={sendText} />
          <button id="sendbtn" onClick={sendChat}>
            <img src="/sendButton.svg" alt="메세지 전송버튼" className="mr-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
