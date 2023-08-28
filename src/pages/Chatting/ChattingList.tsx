import React, { useState, useRef } from 'react';
import ChattingModal from '../../components/Modal/ChattingModal';
import ChattingHeader from '../../components/Header/ChattingHeader';
import ChattingItem from '../../components/Chatting/ChattingItem';
import ChattingEmpty from '../../components/Chatting/ChattingEmpty';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';
// import CheckBox from './CheckBox';

const ChattingList = () => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  // const [isCheck, setIsCheck] = useState<boolean>(true);
  const icon = <BsTrash />;

  return (
    <div className="">
      <Header title="채팅목록" back={true} icon={icon} />
      <div>{isEmpty ? <ChattingItem /> : <ChattingEmpty />}</div>
    </div>
  );
};

export default ChattingList;
