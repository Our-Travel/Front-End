import React, { useState, useEffect } from 'react';
import TourModal from './TourModal';
import axios from 'axios';
import EmptyPage from 'shared/EmptyPage';

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
  tourType: number;
}
const TouristList = ({ tourType }: Cate) => {
  const [boardDetail, setBoardDetail] = useState<TourObject | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [favoriteTouristList, setFavoriteTouristList] = useState<any[]>([]);

  console.log(boardDetail);
  const handleItemClick = (index: number) => {
    const item = favoriteTouristList[index]!;
    setSelectedIdx(index);
    setBoardDetail(item);
    setModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_REST_API_SERVER}/local-place/list?contentTypeId=${tourType}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);
        const locationArr = response.data.data;
        setFavoriteTouristList(locationArr);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
      }
    };
    getData();
  }, [tourType]);

  // if (boardDetail) {
  //   const { content_id, address, content_type_id, home_page, latitude, longitude, image, over_view, tel, tel_name, title } = boardDetail;
  // }

  return (
    <div className="overflow-y-auto h-[650px] relative">
      {favoriteTouristList.length !== 0 ? (
        favoriteTouristList.map((el, index) => {
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
        <EmptyPage content={'NOFAVORITE'} subContent={'NOSUB'} alt={'즐겨찾기된 목록이 없어요 페이지 보라색 캐릭터'} />
      )}
      {modal && <TourModal boardDetail={boardDetail} setModal={setModal} post={null} />}
    </div>
  );
};

export default TouristList;
