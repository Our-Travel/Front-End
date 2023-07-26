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

  const isOpen = () => setModal(!modalOpen);

  const icon = <BsFillChatDotsFill />;
  return (
    <div>
      <Header title={'여행친구 구하기'} back={false} icon={icon} />
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        keyboard={true}
        className="mySwiper h-8 "
      >
        <SwiperSlide className="bg-transparent">
          <button className="text-base border rounded-xl px-4">서울</button>
        </SwiperSlide>
        <SwiperSlide>경기도</SwiperSlide>
        <SwiperSlide>강원도</SwiperSlide>
        <SwiperSlide>충청도</SwiperSlide>
        <SwiperSlide>전라도</SwiperSlide>
        <SwiperSlide>경상도</SwiperSlide>
        <SwiperSlide>제주도</SwiperSlide>
      </Swiper>
      <BoardList />
    </div>
  );
};

export default Board;
