import React, { useRef, useEffect, SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

interface modal {
  setModal: Dispatch<SetStateAction<boolean>>;
  handleButton: () => void;
  title: string;
  button: string;
}

const WriteButton = ({ title, button, setModal, handleButton }: modal) => {
  const navigate = useNavigate();
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
    <div tabIndex={0} onKeyDown={handleKeyDown} className="relative shadow-2xl">
      <div onClick={closeModal} className="z-0 absolute w-full h-[100vh] bg-gray-400 opacity-25" />
      <div className="absolute left-1/2 -translate-x-1/2 translate-y-[250px] w-[300px] h-36 rounded-xl text-xl overflow-hidden bg-white flex flex-col">
        <div className="w-full text-textbase text-lg absolute top-[20%] font-semibold">{title}</div>
        <div className="flex w-full absolute bottom-2 text-lg">
          <button ref={modalRef} onClick={closeModal} className="w-1/2 mx-4 font-semibold bg-gray-200 py-2 rounded-xl">
            취소하기
          </button>
          <button onClick={writeBoardButton} className="w-1/2 mx-4 text-white font-extrabold bg-main-color2 py-2 rounded-xl">
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteButton;
