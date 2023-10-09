import React, { useRef, useEffect, SetStateAction, Dispatch, useState } from 'react';

interface modal {
  setModal: Dispatch<SetStateAction<boolean>>;
  handleButton: () => void;
  title: string;
  button: string;
}

const ModalButton = ({ title, button, setModal, handleButton }: modal) => {
  const modalRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    setModal(false);
  };
  const writeBoardButton = () => {
    handleButton();
  };

  const handleKeyDown = (event: { preventDefault(): unknown; key: string }) => {
    if (event.key === 'Escape') {
      setModal(false);
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="shadow-2xl z-10">
      <div onClick={closeModal} className="z-0 absolute top-0 left-0 w-full h-screen bg-gray-400 opacity-25"></div>
      <div className="centerPosition w-full absolute px-4">
        <div className="h-40 rounded-xl text-xl overflow-hidden bg-white">
          <p className="font-semibold mt-5">{title}</p>
          <div className="flex mt-7 w-full text-lg">
            <button type="button" ref={modalRef} onClick={closeModal} className={`w-1/2 mx-2 font-semibold py-4 rounded-xl ${title === '언어를 선택해주세요.' ? 'bg-main-color2 text-white' : 'bg-gray-200'}`}>
              취소하기
            </button>
            <button onClick={writeBoardButton} className="w-1/2 mx-2 text-white bg-main-color2 font-extrabold py-2 rounded-xl">
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalButton;
