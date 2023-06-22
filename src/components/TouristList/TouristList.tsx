import React, { useState } from 'react';
import { AccDummy as dummy } from '../../util/dummy';
import TourModal from './TourModal';

interface TourObject {
  id: number;
  title: string;
  subtitle: string;
  address: string;
  call: string;
  content: string;
  img: string;
  km: number;
}

const TouristList = () => {
  const [boardDetail, setBoardDetail] = useState<TourObject | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const handleItemClick = (index: number) => {
    const item = dummy[index]!;
    const convertedItem: TourObject = {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      address: item.address,
      call: item.call,
      content: item.content,
      img: item.img,
      km: Number(item.km),
    };
    setBoardDetail(convertedItem);
    setModal(true);
  };

  return (
    <>
      {dummy.map((el, index) => (
        <div key={index} className="listStyles border-b-[2px] border-gray-200" onClick={() => handleItemClick(index)}>
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
      {modal && <TourModal boardDetail={boardDetail} setModal={setModal} />}
    </>
  );
};

export default TouristList;
