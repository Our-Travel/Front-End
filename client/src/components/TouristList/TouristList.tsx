import React, { useState } from 'react';
import { AccDummy as dummy } from '../../util/dummy';
import TourModal from './TourModal';
import { useRecoilValue } from 'recoil';
import { aroundLoc } from '../../Atom/atom';

interface Place {
  address_name: string;
  distance: number;
  id: number;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}
const TouristList = () => {
  const [boardDetail, setBoardDetail] = useState<number | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const location = useRecoilValue<Place[] | null>(aroundLoc);
  console.log(location);
  const handleItemClick = (index: number) => {
    setBoardDetail(index);
    setModal(true);
  };
  return (
    <>
      {location !== null ? (
        location.map((el) => (
          <div key={el.id} className="listStyles border-b-2 border-red-400" onClick={() => handleItemClick(el.id)}>
            <div className="w-[60px] bg-pink-300 p-2 rounded-lg">
              <img src={el.place_url} />
            </div>
            <div className="flex flex-col text-left w-[250px]">
              <span>{el.place_name}</span>
              <span>{el.address_name}</span>
            </div>
            <p className="text-gray-400">{el.distance}m</p>
          </div>
        ))
      ) : (
        <span>위치정보를 받아올 수 없습니다.</span>
      )}
      {/* {modal && <TourModal setModal={setModal} />} */}
    </>
  );
};

export default TouristList;
