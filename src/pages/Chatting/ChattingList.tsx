import React, { useState, useRef } from 'react';
import ChattingItem from '../../components/Chatting/ChattingItem';
import ChattingEmpty from '../../components/Chatting/ChattingEmpty';
import { BsTrash } from 'react-icons/bs';

const ChattingList = () => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  return (
    <div className="w-full">
      <div>{isEmpty ? <ChattingItem /> : <ChattingEmpty />}</div>
    </div>
  );
};

export default ChattingList;
