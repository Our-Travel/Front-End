import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';

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

interface Props {
  boardDetail: TourObject | null;
  setModal: Dispatch<SetStateAction<boolean>>;
  post: {
    address_name: string;
    distance: number;
    id: number;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: number;
    y: number;
  } | null;
}
const TourModal = ({ boardDetail, setModal }: Props) => {
  const closeModal = () => {
    setModal(false);
  };
  const handleClipBoard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(boardDetail?.address ?? '');
      alert('주소가 복사되었습니다!');
    } catch (err) {
      console.error('Could not copy text: ', err);
      alert('주소가 복사되지 않았습니다 :(');
    }
  }, [boardDetail]);

  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };

  return (
    <div className="shadow-2xl">
      <div onClick={closeModal} className="z-0 absolute w-full h-screen centerPosition bg-gray-400 opacity-25" />
      {boardDetail && (
        <div className="absolute bottom-0 w-full h-[470px] bg-white rounded-t-3xl">
          <div className="border-b-2 py-3 font-bold text-lg">{boardDetail.title}</div>
          <div className="h-[150px] flex items-center border-b-2 py-10 pl-5 pr-10">
            <div className="w-[80px] h-[80px] bg-pink-300 p-2 rounded-lg mr-5">
              <img className="mr-6" alt="관광지 사진" src={boardDetail.image ? `${boardDetail.image}` : '/assets/homeicon.png'} />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="font-bold mb-1">{boardDetail.title}</h1>
              <p id="address">{boardDetail.address}</p>
              <p>{boardDetail.tel}</p>
            </div>
          </div>
          <p className="pt-6 pb-3 h-[150px] overflow-y-auto px-6 text-left text-gray-600">{boardDetail.address}</p>
          <div className="mt-4 flex items-center justify-between px-5">
            <div className="flex items-center translate-x-2 hover:cursor-pointer" onClick={toggleFavorite}>
              {isFavorited ? <AiFillHeart className="mr-3 w-[30px] h-[30px]" /> : <AiOutlineHeart className="mr-3 w-[30px] h-[30px]" />}
              <button>Add To Favorite</button>
            </div>
            <div className="w-[1px] h-[30px] bg-black" />
            <div onClick={handleClipBoard} className="flex items-center -translate-x-5">
              <AiOutlineShareAlt className="mr-3 w-[30px] h-[30px]" />
              <button>Share Location</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourModal;
