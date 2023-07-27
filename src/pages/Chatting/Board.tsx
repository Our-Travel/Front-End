import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import BoardList from '../../components/Chatting/BoardList';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const Board = () => {
  const icon = <BsFillChatDotsFill />;
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  const firstRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (index: React.SetStateAction<number>) => {
    setSelectedButtonIndex(index);
  };

  // 모달이 열릴 때 모달 내부의 첫 번째 버튼에 포커스를 줍니다.
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current.focus();
      handleButtonClick(11);
    }
  }, []);

  return (
    <div>
      <Header title={'여행친구 구하기'} back={false} icon={icon} />
      <div className="h-14 relative border-b-2 px-3">
        <Swiper slidesPerView={5} spaceBetween={10} keyboard={true} className="mySwiper h-12 relative">
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button ref={firstRef} className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 11 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(11)}>
              서울
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 26 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(26)}>
              부산
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 27 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(27)}>
              대구
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 28 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(28)}>
              인천
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 29 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(29)}>
              광주
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 30 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(30)}>
              대전
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 31 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(31)}>
              울산
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 36 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(36)}>
              세종
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 41 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(41)}>
              경기도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 42 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(42)}>
              강원도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 43 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(43)}>
              충청북도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 44 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(44)}>
              충청남도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 45 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(45)}>
              전라북도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 46 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(46)}>
              전라남도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 47 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(47)}>
              경상북도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 48 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(48)}>
              경상남도
            </button>
          </SwiperSlide>
          <SwiperSlide className="bg-transparent absolute translate-y-1/4">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 50 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(50)}>
              제주도
            </button>
          </SwiperSlide>
        </Swiper>
      </div>

      <BoardList selectedButtonIndex={selectedButtonIndex} setSelectedButtonIndex={setSelectedButtonIndex} />
    </div>
  );
};

export default Board;
