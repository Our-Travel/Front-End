import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';

interface TourModalProps {
  boardDetail: number | null;
  setModal: Dispatch<SetStateAction<boolean>>;
}
const TourModal = ({ boardDetail, setModal }: TourModalProps) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div>
      <div onClick={closeModal} className="z-0 absolute w-full h-screen modalPosition bg-red-200 opacity-25" />
      <div className="absolute bottom-0 w-full h-[400px] bg-white rounded-t-3xl">
        <div className="border-b-2 py-3">중앙대학교</div>
        <div className="flex items-center border-b-2 py-10 pl-5 pr-10">
          <img className="mr-6" alt="관광지 사진" src="/homeicon.png" />
          <div className="flex flex-col items-start">
            <h1>중앙대학교 캠퍼스</h1>
            <p>서울 동작구 흑석로 84 중앙대학교</p>
            <p>전화번호</p>
          </div>
        </div>
        <p className="pt-10 pb-16">여기에 뭐라고 써야할지 모르겠어 설명이 간지나게 적혀야할거 같은 느낌이 팍팍 든다</p>
        <div className="flex items-center justify-between px-5">
          <div className="flex items-center">
            <AiOutlineHeart className="mr-3 w-[30px] h-[30px]" />
            <span>Add To Favorite</span>
          </div>
          <div className="w-[1px] h-[30px] bg-black" />
          <div className="flex items-center">
            <AiOutlineShareAlt className="mr-3 w-[30px] h-[30px]" />
            <span>Share Location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourModal;
