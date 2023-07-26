import React, { useState, useRef } from 'react';
import BoardItem from './BoardItem';
import { Link } from 'react-router-dom';
import Chatting from './../../pages/Chatting/Chatting';
import PostModal from '../../components/Modal/PostModal';

// BoardList는 게시판 리스트가 있는 컴포넌트로
// BoardItem 들을 호출해오는 곳입니다

const data = [
  { nickName: 'test1', title: '5월에놀러가요', content: 'conetent1' },
  { nickName: 'test2', title: '6월에놀러가요', content: 'content2' },
  { nickName: 'test3', title: '7월에놀러가요', content: 'content3' },
];

// const [modalOpen, setModal] = useState<boolean>(false);

// const isOpen = () => setModal(!modalOpen);

const BoardList = () => {
  return (
    <div>
      {data.map(({ nickName, title, content }, index) => (
        <Link to={'/board/chatting'} key={index}>
          <BoardItem key={index} nickName={nickName} title={title} content={content} />
        </Link>
      ))}
    </div>
  );
};

export default BoardList;
