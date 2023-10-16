import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';
import React, { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { useRecoilValue } from 'recoil';
interface modal {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  setArea: React.Dispatch<React.SetStateAction<string>>;
  nowArea: string;
}
const SelectArea = ({ modal, setModal, setArea, nowArea }: modal) => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
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
      <div className="relative centerPosition w-[400px] h-[380px] text-gray-600 rounded-xl overflow-hidden bg-white border-[1px] shadow-2xl">
        <h3 className="my-5 mx-auto w-[85%] text-main-color3 border-2 border-main-color4 px-1 rounded-lg py-1">
          <SlLocationPin className="inline-block mr-2 font-thin -translate-y-1" />
          {m('REGION_VISITOR')}
        </h3>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '서울' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('서울')}>
            {m('서울')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '부산' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('부산')}>
            {m('부산')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '대구' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('대구')}>
            {m('대구')}
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '인천' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('인천')}>
            {m('인천')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '광주' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('광주')}>
            {m('광주')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '대전' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('대전')}>
            {m('대전')}
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '울산' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('울산')}>
            {m('울산')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '세종' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('세종')}>
            {m('세종')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '경기' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('경기')}>
            {m('경기')}
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '강원' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('강원')}>
            {m('강원')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '충북' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('충북')}>
            {m('충북')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '충남' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('충남')}>
            {m('충남')}
          </button>
        </div>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '전북' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('전북')}>
            {m('전북')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '전남' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('전남')}>
            {m('전남')}
          </button>
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '경북' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('경북')}>
            {m('경북')}
          </button>
        </div>
        <div className="w-[90%] ml-7 mt-3 text-left">
          <button className={`w-[100px] rounded-lg border-2 hover:border-red-200 ${nowArea === '경남' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('경남')}>
            {m('경남')}
          </button>
          <button className={`w-[100px] ml-5 rounded-lg border-2 hover:border-red-200 ${nowArea === '제주' ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection('제주')}>
            {m('제주')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectArea;
