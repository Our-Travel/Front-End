import React, { useState, useRef } from 'react';
import ChattingItem from '../../components/Chatting/ChattingItem';
import ChattingEmpty from '../../components/Chatting/ChattingEmpty';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';

const ChattingList = () => {
  const [isEmpty, setEmpty] = useState<boolean>(true);

  return (
    <div>
      <div>{isEmpty ? <ChattingItem /> : <ChattingEmpty />}</div>
    </div>
  );
};

export default ChattingList;
