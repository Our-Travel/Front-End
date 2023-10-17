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
const areas = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
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
    <div className="fixed w-full h-full -top-10 z-30" onClick={clickCancel} ref={outside}>
      <div className="relative centerPosition w-[90%] h-[380px] text-gray-600 rounded-xl overflow-hidden bg-white border-[1px] shadow-2xl">
        <h3 className="my-5 mx-auto w-[85%] text-main-color3 border-2 border-main-color4 px-1 rounded-lg py-1">
          <SlLocationPin className="inline-block mr-2 font-thin -translate-y-1" />
          {m('REGION_VISITOR')}
        </h3>
        <div className="w-[90%] mx-auto flex justify-around mt-3 ">
          {areas.map((area) => (
            <button key={area} className={`w-24 rounded-lg border-2 hover:border-red-200 ${nowArea === area ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection(area)}>
              {m(area)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectArea;
