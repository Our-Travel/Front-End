import Header from '../../components/Header/Header';
import BoardList from '../../components/Chatting/BoardList';
import { BsFillChatDotsFill } from 'react-icons/bs';
import React, { useState, useRef } from 'react';
import PostModal from '../../components/Modal/PostModal';

const Board = () => {
  const [modalOpen, setModal] = useState<boolean>(false);

  const isOpen = () => setModal(!modalOpen);

  const icon = <BsFillChatDotsFill />;
  return (
    <div>
      <Header title={'여행친구 구하기'} back={false} icon={icon} />
      <BoardList />
    </div>
  );
};

export default Board;
