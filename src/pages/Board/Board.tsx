import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import BoardList from '../../components/Board/BoardList';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { BsPencilSquare } from 'react-icons/bs';
import regions from '../../util/region';
import { useNavigate } from 'react-router-dom';
import { langConvert } from 'Atom/atom';
import { useRecoilValue } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';

const Board = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  const icon = <BsPencilSquare />;
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  const handleButtonClick = (index: number) => {
    setSelectedButtonIndex(index);
  };

  // 모달이 열릴 때 모달 내부의 첫 번째 버튼에 포커스를 줍니다.
  useEffect(() => {
    handleButtonClick(11);
  }, []);

  return (
    <div>
      <Header title={'FRIEND_FIND'} back={false} icon={icon} />
      <div className="relative border-b-2 px-2 flex shrink-0">
        <Swiper slidesPerView={4.6} spaceBetween={5} keyboard={true} className="mySwiper h-12 mr-10 relative">
          {regions.map((region) => (
            <SwiperSlide key={region.value} className="absolute top-1/2 -translate-y-1/3">
              <button className={`text-base border rounded-xl w-full hover:bg-pink-50 ${selectedButtonIndex === region.value ? 'bg-gray-500 text-white font-bold' : ''}`} onClick={() => handleButtonClick(region.value)}>
                {m(`${region.key}`)}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <BoardList selectedButtonIndex={selectedButtonIndex} setSelectedButtonIndex={setSelectedButtonIndex} />
    </div>
  );
};

export default Board;
