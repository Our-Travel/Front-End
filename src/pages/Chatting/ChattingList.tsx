import React, { useState, useRef } from 'react';
import ChattingModal from '../../components/Modal/ChattingModal';
import ChattingHeader from '../../components/Header/ChattingHeader';
import ChattingItem from '../../components/Chatting/ChattingItem';
import ChattingEmpty from '../../components/Chatting/ChattingEmpty';
import Header from '../../components/Header/Header';

const ChattingList = () => {
  const [isEmpty, setEmpty] = useState<boolean>(true);

  return (
    <div className="">
      <Header title="채팅목록" back={true} icon={''} />
      <div>{isEmpty ? <ChattingItem /> : <ChattingEmpty />}</div>
    </div>
  );
};

export default ChattingList;
