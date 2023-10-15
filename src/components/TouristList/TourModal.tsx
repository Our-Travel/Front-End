import React, { Dispatch, SetStateAction, useCallback, useRef, useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
import axios from 'axios';
import useLoginCheck from '../../hooks/useLoginCheck';

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
  setIsStared: any;
}
const TourModal = ({ boardDetail, setModal, setIsStared }: Props) => {
  const loginCheck = useLoginCheck();
  const isLoggedIn = loginCheck();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_REST_API_SERVER}/local-place/${boardDetail?.content_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        let heartResult = response.data.data.liked_travel_info;
        setIsLiked(heartResult);
        setIsStared(heartResult);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
      }
    };
    getData();
  }, []);

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
  const [isLiked, setIsLiked] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
    setIsLiked(!isLiked);
    setIsStared(!isLiked);
  };

  const clickHeart = async () => {
    if (isLoggedIn) {
      const storedToken = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };

      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/local-place/${boardDetail?.content_id}`;
        await axios.post(
          url,
          {},
          {
            headers: headers,
          }
        );
        setIsFavorited((prevIsFavorited) => !prevIsFavorited);
        setIsLiked(!isLiked);
        setIsStared(!isLiked);
        console.log('post 성공');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          alert(error.response.data.msg);
        } else {
          alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
        }
      }
    } else {
      console.log('오류 발생!');
    }
  };

  return (
    <div className="fixed h-screen w-[448px] top-0 bottom-0 bg-black bg-opacity-0 z-30" onClick={closeModal}>
      {boardDetail && (
        <div className="absolute bottom-0 w-full h-[470px] bg-white rounded-t-3xl">
          {/* <a href={`https://map.kakao.com/link/roadview/${longitude},${latitude}`} target="_blank" className="btn btn-link flex-col mb-2">
         <i className="text-xl fa-solid fa-road"></i>로드뷰
       </a>
       <a href={`https://map.kakao.com/link/to/${title},${longitude},${latitude}`} target="_blank" className="btn btn-link flex-col mb-2">
         <i className="text-xl fa-solid fa-arrows-split-up-and-left"></i>길찾기
       </a> */}

          <div className="border-b-2 py-3 font-bold text-lg">{boardDetail.title}</div>
          <div className="h-[150px] flex items-center border-b-2 py-10 pl-5 pr-10">
            <div className="flex justify-center rounded-lg pl-2 mr-2">
              {boardDetail.image ? <img src={boardDetail.image} alt="" className="mr-4 w-[100px] h-[100px] " /> : <img className="w-[80px] h-[80px] mr-6" alt="관광지 사진" src="/assets/homeicon.png" />}
            </div>
            <div className="flex flex-col items-start text-left">
              <h1 className="font-bold mb-1">{boardDetail.title}</h1>
              <p id="address" className="text-left">
                {boardDetail.address}
              </p>
              <p>{boardDetail.tel}</p>
            </div>
          </div>
          <div className="pt-4 pb-3 h-[150px] overflow-y-auto px-6 text-left">
            {boardDetail.home_page && <p className="text-blue-500" dangerouslySetInnerHTML={{ __html: boardDetail.home_page }}></p>}
            <p className="text-gray-600 pt-2">{boardDetail.over_view}</p>
          </div>
          <div className="mt-4 flex items-center justify-between px-5">
            <div className="flex items-center translate-x-2 hover:cursor-pointer" onClick={clickHeart}>
              {isLiked ? <AiFillHeart className="mr-3 w-[30px] h-[30px]" /> : <AiOutlineHeart className="mr-3 w-[30px] h-[30px]" />}
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
