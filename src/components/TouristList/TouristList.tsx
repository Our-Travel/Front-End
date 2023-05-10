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
        <div key={index} className="listStyles" onClick={() => handleItemClick(index)}>
          <img src={el.img} />
          <div className="flex flex-col text-left w-[250px]">
            <span>{el.title}</span>
            <span>{el.subtitle}</span>
          </div>
          <p>{el.km}</p>
        </div>
      ))}
      {modal && <TourModal boardDetail={boardDetail} setModal={setModal} />}
    </>
  );
};

export default TouristList;
