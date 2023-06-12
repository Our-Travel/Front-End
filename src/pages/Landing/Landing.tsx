import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { LoginButton, LoginKakao } from '../../components/LoginButton/LoginButton';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import Modal from '../../components/Modal/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../components/utilCss/landingSwiper.css';
import { GrLanguage } from 'react-icons/gr';

const promotionImg: { title: string }[] = [{ title: '광고이미지' }, { title: '광고이미지' }, { title: '광고이미지' }];
const modalButton: { text: string }[] = [{ text: '한국어 (South Korea)' }, { text: 'English' }];

export default function Landing() {
  const [modalOpen, setModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const isOpen = () => setModal(!modalOpen);

  return (
    <>
      <div className="w-20 h-20 mx-auto my-4">
        <Logo />
      </div>
      <Swiper pagination={{ clickable: true }} modules={[Pagination, Autoplay, A11y]} autoplay={{ delay: 3000, disableOnInteraction: false }} loop={true}>
        {promotionImg.map(({ title }, index) => (
          <SwiperSlide key={index}>
            {index + 1}번 {title}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col gap-6">
        <LoginButton name={'로그인'} page={true} active={active} onClick={() => navigate('/signin')} />
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
      <Modal open={modalOpen} close={setModal} data={modalButton} page={'landing'} />
    </>
  );
}
