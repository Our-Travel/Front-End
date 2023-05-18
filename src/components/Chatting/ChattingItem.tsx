import React from 'react';
import { Link } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';

const chat = [
  {
    nickName: '맷돌이',
    content: '혹시 프로젝트 통과하나요?',
    time: '14:15',
  },
  {
    nickName: '다시',
    content: '혹시 프로젝트 통과하나요?',
    time: '14:15',
  },
  {
    nickName: '지금까지',
    content: '혹시 프로젝트 통과하나요?',
    time: '14:15',
  },
];

const ChattingItem = () => {
  return (
    <div>
      {chat.map(({ nickName, content, time }, index) => (
        <Link to={'/board/chatting'}>
          <ChattingComponent key={index} nickName={nickName} content={content} time={time} />
        </Link>
      ))}
    </div>
  );
};

export default ChattingItem;
