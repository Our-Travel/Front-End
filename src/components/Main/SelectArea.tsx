import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';
import React, { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { cloneData } from 'react-chartjs-2/dist/utils';
import { SlLocationPin } from 'react-icons/sl';
import { useRecoilValue } from 'recoil';
import regions from 'util/region';
interface modal {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  setArea: React.Dispatch<React.SetStateAction<string>>;
  nowArea: string;
}
const SelectArea: React.FC<modal> = ({ modal, setModal, setArea, nowArea }) => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  const closeModal = () => {
    setModal(false);
  };

  const handleButtonClick = (areaKey: string) => {
    setArea(areaKey);
    setModal(false);
  };

  useEffect(() => {
    const buttonToFocus = document.querySelector(`[data-area="${nowArea}"]`) as HTMLElement;
    if (buttonToFocus) {
      buttonToFocus.focus();
    }
  }, [nowArea]);

  return (
    <>
      <div className="w-full h-[calc(100vh-6rem)] absolute -top-40 bg-slate-500 opacity-25" onClick={closeModal}></div>
      <div className="justify-center flex">
        <div className="absolute top-0 w-[90%] h-[500px] z-10">
          <div className="top-0 mx-auto text-gray-600 rounded-xl bg-white border-2 shadow-2xl">
            <h3 className="my-3 mx-auto w-[85%] text-main-color3 border-2 border-main-color4 px-1 rounded-lg py-1">
              <SlLocationPin className="inline-block mr-2 font-thin -translate-y-1" />
              {m('REGION_VISITOR')}
            </h3>
            <div className="grid grid-cols-2 px-9">
              {regions.map((area) => {
                return (
                  <button
                    key={area.key}
                    data-area={area.key}
                    className={`py-1 my-[2px] w-[90%] mx-auto rounded-lg border-2 hover:border-red-200 ${nowArea === area.key ? 'bg-main-color2 border-main-color2 text-white' : ''}`}
                    onClick={() => handleButtonClick(area.key)}
                  >
                    {m(area.key)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectArea;
