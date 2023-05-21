import React, { useState } from 'react';
import { AccDummy as dummy } from '../../util/dummy';
import TourModal from './TourModal';

const TouristList = () => {
  const [boardDetail, setBoardDetail] = useState<number | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const handleItemClick = (index: number) => {
    setBoardDetail(index);
    setModal(true);
  };
  return (
    <>
      {dummy.map((el, index) => (
        <div key={index} className="listStyles border-b-2 border-red-400" onClick={() => handleItemClick(index)}>
          <div className="w-[60px] bg-pink-300 p-2 rounded-lg">
            <img src={el.img} />
          </div>
          <div className="flex flex-col text-left w-[250px]">
            <span>{el.title}</span>
            <span>{el.subtitle}</span>
          </div>
          <p className="text-gray-400">{el.km}</p>
        </div>
      ))}
      {modal && <TourModal setModal={setModal} />}
    </>
  );
};

export default TouristList;
