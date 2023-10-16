import React, { useState } from 'react';
import KakaoMap from '../../components/KakaoMap/KakaoMap';
import contentTypes from './../../util/contentType';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const Map = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(12);
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  const handleButtonClick = (index: React.SetStateAction<number>) => {
    setSelectedButtonIndex(index);
  };

  return (
    <div className="h-full">
      <div className="relative border-b-2  h-14 flex text-center justify-center items-center">
        {contentTypes.map((contentType) => (
          <button
            key={contentType.key}
            className={`text-[clamp(10px,3vw,16px)] border rounded-xl my-1 mx-[2px] p-1 h-8 hover:bg-pink-50 ${selectedButtonIndex === contentType.value ? 'bg-gray-500 text-white font-bold' : ''}`}
            onClick={() => handleButtonClick(contentType.value)}
          >
            {m(contentType.key)}
          </button>
        ))}
      </div>
      <div className="h-[calc(100%-7rem)]">
        <KakaoMap selectedButtonIndex={selectedButtonIndex} />
      </div>
    </div>
  );
};

export default Map;
