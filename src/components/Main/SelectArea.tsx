import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';
import React, { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { useRecoilValue } from 'recoil';
import regions from 'util/region';
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
    <div className="w-full h-full z-30" onKeyUp={clickCancel} ref={outside}>
      <div className={`absolute top-24 w-[100%] h-[470px] text-gray-600 rounded-xl overflow-hidden bg-white border-[1px] shadow-2xl`}>
        <h3 className="my-5 mx-auto w-[85%] text-main-color3 border-2 border-main-color4 px-1 rounded-lg py-1">
          <SlLocationPin className="inline-block mr-2 font-thin -translate-y-1" />
          {m('REGION_VISITOR')}
        </h3>
        <div className="grid grid-cols-2 mt-3 px-9 ">
          {regions.map((area) => (
            <button key={area.key} className={`py-1 rounded-lg border-2 hover:border-red-200 ${nowArea === area.key ? 'bg-main-color2 border-main-color2 text-white' : ''}`} onClick={() => handleButtonSelection(area.key)}>
              {m(area.key)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectArea;
