import React, { useState, useEffect } from 'react';
import { tourDummy as dummy } from '../../util/dummy';
import TourModal from './TourModal';
import axios from 'axios';

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
  const [boardDetail, setBoardDetail] = useState<TourObject | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [favoriteTouristList, setFavoriteTouristList] = useState<any[]>([]);

  const handleItemClick = (index: number) => {
    const item = favoriteTouristList[index]!;
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
    setSelectedIdx(index);
    setBoardDetail(convertedItem);
    setModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_REST_API_SERVER}/local-place/list?contentTypeId=12`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        let locationArr = response.data.data;
        setFavoriteTouristList(locationArr);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
      }
    };
    getData();
  }, []);

  console.log(favoriteTouristList);

  return (
    <div className="overflow-y-auto h-[650px]">
      {favoriteTouristList.map((el, index) => (
        <div key={index} className={`h-[105px] flex items-center p-4 border-b-[2px] border-gray-200 ${index === selectedIdx ? 'border-main-color border' : ''}`} onClick={() => handleItemClick(index)} tabIndex={0} role="button">
          <div className="w-[80px]">
            {el.image ? <img src={el.image} alt={el.title} className="w-[80px] h-[70px]" /> : <img className="w-[80px] h-[70px]" alt="관광지 사진" src="/homeicon.png" />}
            {/* <img src={el.image} alt={el.title} className="w-[80px] h-[70px]" /> */}
          </div>
          <div className="flex flex-col text-left  pl-6">
            <span className="font-semibold text-gray-700">{el.title}</span>
            <span>{el.address}</span>
          </div>
          {/* <p className="text-gray-400">{el.km}</p> */}
        </div>
      ))}
      {modal && <TourModal boardDetail={boardDetail} setModal={setModal} post={null} />}
    </div>
  );
};

export default TouristList;
