import { CiMenuKebab } from 'react-icons/ci';
import { SlArrowLeft } from 'react-icons/sl';
import React, { useState, useRef } from 'react';
import ChattingModal from '../../components/Modal/ChattingModal';

interface chattingheader {
  title: string;
  buttonList: { text: string }[];
}

export default function Header({ title, buttonList }: chattingheader) {
  const [modalOpen, setModal] = useState<boolean>(false);
  // const [modalButton, setModalButton] = useState([{ text: '나가기' }, { text: '모하지' }, { text: '모하지' }]);

  const isOpen = () => setModal(!modalOpen);
  return (
    <>
      <header className="flex justify-center items-center text-2xl py-3 border-b border-gray-200">
        <button type="button" className="absolute left-1 px-2 py-2">
          <SlArrowLeft />
        </button>
        <h2>{title}</h2>
        <button type="button" className="absolute right-1 px-2 py-2" onClick={isOpen}>
          <CiMenuKebab />
        </button>
      </header>
      <ChattingModal open={modalOpen} close={setModal} />
    </>
  );
}
