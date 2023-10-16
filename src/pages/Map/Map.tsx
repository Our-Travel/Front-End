import React, { useState } from 'react';
import KakaoMap from '../../components/KakaoMap/KakaoMap';
import contentTypes from './../../util/contentType';

interface MapProps {
  token: string;
}

const Map = ({ token }: MapProps) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(12);
  const [typeId, setTypeId] = useState<number | null>(0);

  const handleButtonClick = (index: React.SetStateAction<number>) => {
    setSelectedButtonIndex(index);
  };

  return (
    <div className="h-full">
      <div className="relative border-b-2  h-14 flex text-center justify-center items-center">
        {contentTypes.map((contentType) => (
          <button className={`text-base border rounded-xl my-1 mx-[2px] p-1 h-8 hover:bg-pink-50 ${selectedButtonIndex === contentType.value ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(contentType.value)}>
            {contentType.key}
          </button>
        ))}
      </div>
      <div className="h-[calc(100%-7rem)]">
        <KakaoMap token={token} selectedButtonIndex={selectedButtonIndex} />
      </div>
    </div>
  );
};

export default Map;
