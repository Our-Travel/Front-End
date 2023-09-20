import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { Button, LoginKakao, LoginGoogle } from '../../components/LoginButton/Button';
import ChoiceTab from '../../components/SignIn/ChoiceTab';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../components/utilCss/landingSwiper.css';
import { GrLanguage } from 'react-icons/gr';
// import WriteButton from '../../components/Chatting/WriteButton';
import WriteButton from 'components/Board/WriteButton';

const promotionImg = [
  { title: '광안대교', imgSrc: '/assets/bridge.JPG' },
  { title: '집에서본 광안대교', imgSrc: '/assets/bridge2.JPG' },
  { title: '집', imgSrc: '/assets/house.JPG' },
];

export default function Landing() {
  const [modal, setModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const isOpen = () => setModal(!modal);

  const handleLanguage = () => {
    console.log('언어설정');
  };

  return (
    <>
      <div className="w-20 h-20 mx-auto my-4">
        <Logo />
      </div>
      {modal && <WriteButton title={'언어를 선택해주세요.'} button={'English'} setModal={setModal} handleButton={handleLanguage} />}
      <Swiper pagination={{ clickable: true }} modules={[Pagination, Autoplay, A11y]} autoplay={{ delay: 3000, disableOnInteraction: false }} loop={true}>
        {promotionImg.map(({ title, imgSrc }, index) => (
          <SwiperSlide key={index} className="landingSlide">
            <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col gap-6 mb-4">
        <Button name={'로그인'} page={true} active={active} onClick={() => navigate('/signin')} />
        <div className="text-center">
          <div className="flex items-center">
            <div className="flex-grow border-b"></div>
            <div className="px-2 text-gray-500 text-xs">Social Login</div>
            <div className="flex-grow border-b"></div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-8">
          <LoginKakao />
          <LoginGoogle />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <ChoiceTab />
      </div>
    </>
  );
}
