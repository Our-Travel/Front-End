import React, { useState, useRef } from 'react';
import ChattingModal from '../../components/Modal/ChattingModal';
import ChattingHeader from '../../components/Header/ChattingHeader';
import ChattingItem from '../../components/Chatting/ChattingItem';

const ChattingList = () => {
  const [modalOpen, setModal] = useState<boolean>(false);
  const [modalButton, setModalButton] = useState([{ text: '나가기' }, { text: '모하지' }, { text: '모하지' }]);

  const isOpen = () => setModal(!modalOpen);

  return (
    <div className="">
      <ChattingHeader title={'채팅목록'} buttonList={modalButton} />
      <div>
        <ChattingItem />
      </div>
    </div>
  );
};

export default ChattingList;
