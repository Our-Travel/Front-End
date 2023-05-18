import React from 'react';
import Header from '../../components/Header/Header';
import BoardList from '../../components/Chatting/BoardList';

const Board = () => {
  return (
    <div>
      <Header title={'여행친구 구하기'} showButton={false} />
      <BoardList />
    </div>
  );
};

export default Board;
