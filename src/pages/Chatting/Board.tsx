import React from 'react';
import Header from '../../components/Header/Header';
import BoardList from '../../components/Chatting/BoardList';
import { BsFillChatDotsFill } from 'react-icons/bs';

const Board = () => {
  const icon = <BsFillChatDotsFill />;
  return (
    <div>
      <Header title={'여행친구 구하기'} back={false} icon={icon} />
      <BoardList />
    </div>
  );
};

export default Board;
