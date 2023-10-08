import { Button } from 'components/LoginButton/Button';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Feedback = ({ setModal }: Props) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <div onClick={closeModal} className="absolute w-full h-screen centerPosition  bg-gray-400 opacity-25" />
      <div className="w-full absolute centerPosition px-4">
        <div className="w-full px-3 py-3 z-20 bg-pink-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 my-2 text-lg">여러분의 소중한 의견에 감사드립니다.</h3>
          <textarea className="w-full h-[20rem] py-2 px-3" placeholder="소중한 의견을 적어주세요"></textarea>
          <Button name={'보내기'} page={false} active onClick={closeModal} />
        </div>
      </div>
    </>
  );
};

export default Feedback;
