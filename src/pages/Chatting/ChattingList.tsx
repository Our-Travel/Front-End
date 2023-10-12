import React, { useState, useRef } from 'react';
import ChattingItem from '../../components/Chatting/ChattingItem';
import ChattingEmpty from '../../components/Chatting/ChattingEmpty';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';

const ChattingList = () => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const icon = <BsTrash />;

  return (
    // host 채팅 테스트
    <div className="h-[85%]">
      <Header title="채팅목록" back={false} icon={icon} />
      <div className="h-full overflow-y-auto">{isEmpty ? <ChattingItem /> : <ChattingEmpty />}</div>
    </div>
  );
};

export default ChattingList;
