import { langConvert } from 'Atom/atom';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { cls } from 'util/util';

function TranslationButton() {
  const [translationToggle, setTranslationToggle] = useState(true);
  const setLang = useSetRecoilState(langConvert);

  const handleChangeLange = ({ target: { value } }: any) => {
    value && setLang(value);
    if (value === 'ko') {
      setTranslationToggle(true);
    } else {
      setTranslationToggle(false);
    }
  };
  return (
    <div className="z-50 absolute top-3 right-3 rounded-full bg-main-color4 w-20 h-8 flex items-center">
      <button
        value={!translationToggle ? 'ko' : 'en'}
        className={cls('z-50 absolute focus:outline-none bg-main-color w-6 h-6 rounded-full left-1  transition-all duration-500 ease-linear', translationToggle ? '' : ' left-[50px]')}
        onClick={handleChangeLange}
      />
      <span className={cls('absolute text-white animate-pulse', translationToggle ? ' right-[7px]' : ' left-[7px]')}>{translationToggle ? 'KOR' : 'ENG'}</span>
    </div>
  );
}

export default TranslationButton;
