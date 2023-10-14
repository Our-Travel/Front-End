import React, { useState, useEffect } from 'react';
import TourModal from './TourModal';
import axios from 'axios';
import contentTypes from 'util/contentType';

interface TourObject {
  address: string;
  content_id: number;
  content_type_id: number;
  home_page: null;
  image: string;
  latitude: number;
  longitude: number;
  over_view: null;
  tel: string;
  tel_name: null;
  title: string;
}
interface TourType {
  address: string;
  content_id: number;
  content_type_id: number;
  home_page: null;
  image: string;
  latitude: number;
  longitude: number;
  over_view: null;
  tel: string;
  tel_name: null;
  title: string;
}
interface Cate {
  tourType: string;
}
const TouristList = ({ tourType }: Cate) => {
  console.log(tourType);
  const [boardDetail, setBoardDetail] = useState<TourObject | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [favoriteTouristList, setFavoriteTouristList] = useState<any[]>([]);

  console.log(boardDetail);
  const handleItemClick = (index: number) => {
    const item = favoriteTouristList[index]!;
    console.log(item);

    setSelectedIdx(index);
    setBoardDetail(item);
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
        const locationArr = response.data.data;
        setFavoriteTouristList(locationArr);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
      }
    };
    getData();
  }, []);
  const fliterList = favoriteTouristList.filter((ty) => String(ty.content_type_id) === tourType);
  console.log(fliterList);
  return (
    <div className="overflow-y-auto h-[650px]">
      {fliterList.length !== 0 ? (
        fliterList.map((el, index) => {
          return (
            <div key={index} className={`h-[105px] flex items-center p-4 border-b-[2px] border-gray-200 ${index === selectedIdx ? 'border-main-color border' : ''}`} onClick={() => handleItemClick(index)} tabIndex={0} role="button">
              <div className="w-[80px]">
                <img className="w-[80px] h-[70px]" alt="관광지 사진" src={el.image ? `${el.image}` : '/assets/homeicon.png'} />
              </div>
              <div className="flex flex-col text-left  pl-6">
                <span className="font-semibold text-gray-700">{el.title}</span>
                <span>{el.address}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div>아모고토없음</div>
      )}
      {modal && <TourModal boardDetail={boardDetail} setModal={setModal} post={null} />}
    </div>
  );
};

export default TouristList;
