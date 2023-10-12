import React, { useEffect, useState } from 'react';
import { AccDummy as dummy } from '../../util/dummy';
import TourModal from './TourModal';
import axios from 'axios';

interface AccommodationObject {
  id: number;
  title: string;
  subtitle: string;
  address: string;
  call: string;
  content: string;
  img: string;
  km: number;
}

const Accommodation = () => {
  useEffect(() => {}, []);
  const [boardDetail, setBoardDetail] = useState<AccommodationObject | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    const item = dummy[index]!;
    const convertedItem: AccommodationObject = {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      address: item.address,
      call: item.call,
      content: item.content,
      img: item.img,
      km: Number(item.km),
    };
    setSelectedIdx(index);
    setBoardDetail(convertedItem);
    setModal(true);
  };

  const handleItemKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter') {
      handleItemClick(index);
    }
  };

  return (
    <div className="overflow-y-auto h-[650px]">
      {dummy.map((el, index) => (
        <div
          key={index}
          className={`listStyles border-b-[2px] border-gray-200 ${index === selectedIdx ? 'border-main-color border-2 focus' : ''}`}
          onClick={() => handleItemClick(index)}
          onKeyDown={(event) => handleItemKeyDown(event, index)}
          tabIndex={0}
          role="button"
        >
          <div className="w-[60px] bg-pink-300 p-2 rounded-lg">
            <img src={el.img} alt={el.title} />
          </div>
          <div className="flex flex-col text-left w-[250px]">
            <span className="font-semibold text-gray-700">{el.title}</span>
            <span>{el.subtitle}</span>
          </div>
          <p className="text-gray-400">{el.km}</p>
        </div>
      ))}
      {modal && <TourModal boardDetail={boardDetail} setModal={setModal} post={null} />}
    </div>
  );
};

export default Accommodation;
