import React, { Dispatch, SetStateAction, useRef } from 'react';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';

interface TourObject {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  km: number;
}

interface Props {
  boardDetail: TourObject | null;
  setModal: Dispatch<SetStateAction<boolean>>;
}
const TourModal = ({ boardDetail, setModal }: Props) => {
  const closeModal = () => {
    setModal(false);
  };
  const handleClipBoard = async () => {
    const text = document.getElementById('address')?.innerText;
    if (text && !document.hasFocus()) {
      await navigator.clipboard.writeText(text);
      alert('복사됐다');
    } else {
      alert('복사실패');
    }
  };
  return (
    <div className="shadow-2xl">
      <div onClick={closeModal} className="z-0 absolute w-full h-screen modalPosition bg-gray-400 opacity-25" />
      {boardDetail && (
        <div className="absolute bottom-0 w-full h-[470px] bg-white rounded-t-3xl">
          <div className="border-b-2 py-3">{boardDetail.title}</div>
          <div className="flex items-center border-b-2 py-10 pl-5 pr-10">
            <div className="w-[70px] h-[80px] bg-pink-300 p-2 rounded-lg mr-3">
              <img className="mr-6" alt="관광지 사진" src="/homeicon.png" />
            </div>
            <div className="flex flex-col items-start">
              <h1>{boardDetail.subtitle}</h1>
              <p id="address">서울 동작구 흑석로 84 중앙대학교</p>
              <p>전화번호</p>
            </div>
          </div>
          <p className="pt-10 pb-16 px-6 text-left">여기에 뭐라고 써야할지 모르겠어 설명이 간지나게 적혀야할거 같은 느낌이 팍팍 든다</p>
          <div className="flex items-center justify-between px-5">
            <div className="flex items-center translate-x-2">
              <AiOutlineHeart className="mr-3 w-[30px] h-[30px]" />
              <span>Add To Favorite</span>
            </div>
            <div className="w-[1px] h-[30px] bg-black" />
            <div onClick={handleClipBoard} className="flex items-center -translate-x-5">
              <AiOutlineShareAlt className="mr-3 w-[30px] h-[30px]" />
              <button>Share Location</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourModal;
