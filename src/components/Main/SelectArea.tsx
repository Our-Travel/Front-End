import React, { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
interface modal {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  setArea: React.Dispatch<React.SetStateAction<string>>;
  nowArea: string;
}
const SelectArea = ({ modal, setModal, setArea, nowArea }: modal) => {
  const outside = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModal(false);
  };

  const clickCancel: any = (e: MouseEvent<HTMLDivElement> & KeyboardEvent<HTMLButtonElement>) => {
    if (outside.current === e.target || e.key === 'Escape') {
      closeModal();
    }
  };

  const handleButtonSelection = (selectedArea: string) => {
    setArea(selectedArea);
    setModal(false);
  };

  return (
    <div className="fixed w-[450px] h-full -top-10 z-30" onClick={clickCancel} ref={outside}>
      <div className="relative centerPosition w-[400px] h-[350px] text-gray-600 rounded-xl overflow-hidden bg-white border-[1px] shadow-2xl">
        <h3 className="my-5 mx-auto w-[85%] text-main-color3 border-2 border-main-color4 px-1 rounded-lg py-1">
          <SlLocationPin className="inline-block mr-2 font-thin -translate-y-1" />
          지역별 방문자 수를 확인하세요
        </h3>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '서울' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('서울')}>
            서울
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '부산' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('부산')}>
            부산
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '대구' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('대구')}>
            대구
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '인천' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('인천')}>
            인천
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '광주' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('광주')}>
            광주
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '대전' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('대전')}>
            대전
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '울산' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('울산')}>
            울산
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '세종' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('세종')}>
            세종
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '경기도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('경기도')}>
            경기도
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '강원도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('강원도')}>
            강원도
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '충청북도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('충청북도')}>
            충청북도
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '충청남도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('충청남도')}>
            충청남도
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '전라북도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('전라북도')}>
            전라북도
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '전라남도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('전라남도')}>
            전라남도
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '경상북도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('경상북도')}>
            경상북도
          </button>
        </div>
        <div className="w-[90%] ml-7 mt-3 text-left">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '경상남도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('경상남도')}>
            경상남도
          </button>
          <button className={`w-[100px] ml-5 rounded-lg border-2 hover:border-red-200 ${nowArea === '제주도' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('제주도')}>
            제주도
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectArea;