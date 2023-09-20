import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Feedback = ({ setModal }: Props) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-[400px] h-[500px] z-20 bg-pink-50 rounded-lg">
      <h3 className="font-semibold text-gray-800 my-4 text-lg">여러분의 소중한 의견에 감사드립니다.</h3>
      <textarea className="w-[350px] h-[350px] py-2 px-3" placeholder="소중한 의견을 적어주세요"></textarea>
      <button className="buttonStyle buttonHoverSize text-white font-bold w-[300px]" onClick={closeModal}>
        보내기
      </button>
    </div>
  );
};

export default Feedback;
