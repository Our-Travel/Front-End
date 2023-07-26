import React, { useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import BoardList from '../../components/Chatting/BoardList';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import PostModal from '../../components/Modal/PostModal';

const Board = () => {
  const [modalOpen, setModal] = useState<boolean>(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  // 버튼 클릭 시 호출되는 함수입니다.
  const handleButtonClick = (index: React.SetStateAction<number>) => {
    setSelectedButtonIndex(index);
  };

  const isOpen = () => setModal(!modalOpen);

  const icon = <BsFillChatDotsFill />;
  return (
    <div>
      <Header title={'여행친구 구하기'} back={false} icon={icon} />
      <div className="h-14 relative border-b-2 px-3">
        <Swiper
          slidesPerView={5}
          spaceBetween={7}
          pagination={{
            clickable: true,
          }}
          keyboard={true}
          className="mySwiper h-8 absolute top-1/2 -translate-y-1/2"
        >
          <SwiperSlide className="bg-transparent">
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 0 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(0)}>
              서울
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 1 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(1)}>
              경기도
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 2 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(2)}>
              강원도
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 3 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(3)}>
              충청도
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 4 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(4)}>
              전라도
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 5 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(5)}>
              경상도
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button className={`text-base border rounded-xl w-[70px] ${selectedButtonIndex === 6 ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(6)}>
              제주도
            </button>
          </SwiperSlide>
        </Swiper>
      </div>

      <BoardList />
    </div>
  );
};

export default Board;
