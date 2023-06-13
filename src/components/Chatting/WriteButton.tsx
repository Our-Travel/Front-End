import React, { useRef, useEffect, SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

interface modal {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

const WriteButton = ({ open, close }: modal) => {
  const navigate = useNavigate();
  const outside = useRef<HTMLDivElement>(null);
  // const modalButton: { text: string }[] = [{ text: '취소하기' }, { text: '작성하기' }];

  const closeModal = () => {
    close(false);
  };
  const openModal = () => {
    navigate('/board');
  };

  const clickOutside = (e: MouseEvent) => {
    if (outside.current === e.target) {
      closeModal();
    }
  };

  const escClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    document.addEventListener('keydown', escClose);
    return () => {
      document.removeEventListener('click', clickOutside);
      document.removeEventListener('keydown', escClose);
    };
  });

  return open ? (
    <div className="fixed w-[450px] h-full top-0 bg-black bg-opacity-30 z-30 text-center" ref={outside}>
      <div className="centerPosition relative w-[300px] h-36 rounded-xl text-xl overflow-hidden bg-white flex flex-col">
        <div className="w-full text-textbase text-lg absolute top-[20%] font-semibold">글을 작성하시겠습니까?</div>
        <div className="flex w-full absolute bottom-2 text-lg">
          <button className="w-1/2 mx-4 font-semibold bg-gray-200 py-2 rounded-xl" onClick={closeModal}>
            취소하기
          </button>
          <button className="w-1/2 mx-4 text-white font-extrabold bg-main-color2 py-2 rounded-xl" onClick={openModal}>
            작성하기
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default WriteButton;
