import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GrClose } from 'react-icons/gr';
import { HiHeart } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import useLoginCheck from '../../hooks/useLoginCheck';
import axios from 'axios';
import { Console } from 'console';
// import Header from 'components/Header/ChattingHeader';
// import { Header } from 'components/Header/Header';

const KakaoMapModal = ({ locationList, setModalClose, clickIndex, starClickedArr, setStarClickedArr }: any) => {
  // let newStarArr = Array(locationList.length).fill(false);
  // const [starClickedArr, setStarClickedArr] = useState(newStarArr);
  const [isLiked, setIsLiked] = useState(false);
  const loginCheck = useLoginCheck();
  const isLoggedIn = loginCheck();
  const modalRef = useRef(null);
  const modalClose = () => {
    setModalClose(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_REST_API_SERVER}/local-place/${clickIndex}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        let heartResult = response.data.data.liked_travel_info;
        setIsLiked(heartResult);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
      }
    };
    getData();
  }, []);

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  });

  const clickOutside = (e: any) => {
    // console.log(modalRef.current);

    if (modalRef.current === e.target) {
      modalClose();
    }
  };
  console.log('모달 호출됨');

  let thing: any = null;

  // console.log(`boardDetail: ${boardDetail}`);

  locationList.map((item: any) => {
    if (clickIndex === item.content_id) {
      thing = item;
    }
  });
  // console.log(thing.home_page);

  const { content_id, address, content_type_id, home_page, latitude, longitude, image, over_view, tel, tel_name, title, liked_travel_info } = thing;

  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);

    // starClickedArr[idx] = !starClickedArr[idx];
    // setStarClickedArr([...starClickedArr]);
    setIsLiked(!isLiked);
  };
  const handleClipBoard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(thing?.address ?? '');
      alert('주소가 복사되었습니다!');
    } catch (err) {
      console.error('Could not copy text: ', err);
      alert('주소가 복사되지 않았습니다 :(');
    }
  }, [thing]);

  const clickHeart = async () => {
    if (isLoggedIn) {
      const storedToken = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };

      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/local-place/${content_id}`;
        await axios.post(
          url,
          {},
          {
            headers: headers,
          }
        );
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

  const [favoriteTouristList, setFavoriteTouristList] = useState<any[]>([]);
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

  let idx = locationList.findIndex((obj: any) => obj.content_id === clickIndex);
  // console.log(`인덱스: ${idx}`);

  return (
    // <div className="fixed h-screen top-0 bottom-0 bg-black bg-opacity-30 z-30" ref={modalRef}></div>
    <div className="fixed h-screen w-[448px] top-0 bottom-0 bg-black bg-opacity-0 z-30" ref={modalRef}>
      {/* {thing && ( */}
      <div className="absolute bottom-0 w-full h-[470px] bg-white rounded-t-3xl">
        {/* <a href={`https://map.kakao.com/link/roadview/${longitude},${latitude}`} target="_blank" className="btn btn-link flex-col mb-2">
          <i className="text-xl fa-solid fa-road"></i>로드뷰
        </a>
        <a href={`https://map.kakao.com/link/to/${title},${longitude},${latitude}`} target="_blank" className="btn btn-link flex-col mb-2">
          <i className="text-xl fa-solid fa-arrows-split-up-and-left"></i>길찾기
        </a> */}

        <div className="border-b-2 py-3 font-bold text-lg">{title}</div>
        <div className="h-[150px] flex items-center border-b-2 py-10 pl-5 pr-10">
          <div className="flex justify-center rounded-lg pl-2 mr-2">{image ? <img src={image} alt="" className="mr-4 w-[100px] h-[100px] " /> : <img className="w-[80px] h-[80px] mr-6" alt="관광지 사진" src="/assets/homeicon.png" />}</div>
          <div className="flex flex-col items-start text-left">
            <h1 className="font-bold mb-1">{title}</h1>
            <p id="address" className="text-left">
              {address}
            </p>
            <p>{tel}</p>
          </div>
        </div>
        <div className="pt-4 pb-3 h-[150px] overflow-y-auto px-6 text-left">
          {home_page && <p className="text-blue-500" dangerouslySetInnerHTML={{ __html: home_page }}></p>}
          <p className="text-gray-600 pt-2">{over_view}</p>
        </div>
        <div className="mt-4 flex items-center justify-between px-5">
          <div className="flex items-center translate-x-2 hover:cursor-pointer" onClick={toggleFavorite}>
            {isLiked ? <AiFillHeart className="mr-3 w-[30px] h-[30px]" onClick={clickHeart} /> : <AiOutlineHeart className="mr-3 w-[30px] h-[30px]" onClick={clickHeart} />}
            <button>Add To Favorite</button>
          </div>
          <div className="w-[1px] h-[30px] bg-black" />
          <div onClick={handleClipBoard} className="flex items-center -translate-x-5">
            <AiOutlineShareAlt className="mr-3 w-[30px] h-[30px]" />
            <button>Share Location</button>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default KakaoMapModal;
