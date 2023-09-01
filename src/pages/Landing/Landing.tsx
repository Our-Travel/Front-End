import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { Button, LoginKakao } from '../../components/LoginButton/Button';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../components/utilCss/landingSwiper.css';
import { GrLanguage } from 'react-icons/gr';
// import WriteButton from '../../components/Chatting/WriteButton';
import WriteButton from 'components/Board/WriteButton';

const promotionImg: { title: string }[] = [{ title: '광고이미지' }, { title: '광고이미지' }, { title: '광고이미지' }];

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
        {promotionImg.map(({ title }, index) => (
          <SwiperSlide key={index}>
            {index + 1}번 {title}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col gap-6">
        <Button name={'로그인'} page={true} active={active} onClick={() => navigate('/signin')} />
        <LoginKakao />
      </div>
      <div className="flex flex-row items-center justify-center">
        <button type="button" name="language" className="flex flex-row items-center gap-1 px-1 text-gray-500" onClick={isOpen}>
          <GrLanguage />
          <span>언어설정</span>
        </button>
        <span className="mx-4">|</span>
        <ChoiceTab />
      </div>
      <div>
        <Link to="/">
          <span className="text-gray-500">feedback</span>
        </Link>
      </div>
    </>
  );
}
