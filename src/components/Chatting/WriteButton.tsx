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
    <div tabIndex={0} onKeyDown={handleKeyDown} className="relative shadow-2xl z-10">
      <div onClick={closeModal} className="z-0 absolute w-full h-[100vh] bg-gray-400 opacity-25" />
      <div className="absolute left-1/2 -translate-x-1/2 translate-y-[250px] w-[350px] h-40 rounded-xl text-xl overflow-hidden bg-white px-1 flex flex-col justify-evenly">
        <p className="w-full font-semibold">{title}</p>
        <div className="flex w-full text-lg">
          <button type="button" ref={modalRef} onClick={closeModal} className={`w-1/2 mx-2 font-semibold py-4 rounded-xl ${title === '언어를 선택해주세요.' ? 'bg-main-color2 text-white' : 'bg-gray-200'}`}>
            {title === '언어를 선택해주세요.' ? (
              <span>
                한국어 <br /> (South Korea)
              </span>
            ) : (
              <span>취소하기</span>
            )}
          </button>
          <button onClick={writeBoardButton} className="w-1/2 mx-2 text-white bg-main-color2 font-extrabold py-2 rounded-xl">
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteButton;
