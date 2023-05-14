import React, { useState, useRef } from 'react';
import Logo from '../../components/Logo/Logo';
import { LoginButton, LoginKakao } from '../../components/LoginButton/LoginButton';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import LanguageModal from '../../components/LanguageModal/LanguageModal';
import { Link } from 'react-router-dom';
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../components/utilCss/landingSwiper.css';
import { GrLanguage } from 'react-icons/gr';

const promotionImg: { title: string }[] = [{ title: '광고이미지' }, { title: '광고이미지' }, { title: '광고이미지' }];

export default function Landing() {
  const [open, setOpen] = useState<boolean>(false);
  const target = useRef<HTMLButtonElement>(null);

  const modalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget === target.current) setOpen(true);
  };

  // @@@@@나중에 페이지 Link 확인 후 지우기@@@@@
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
      <div className="flex flex-col gap-5">
        <LoginButton name={'로그인'} page={true} />
        <LoginKakao />
      </div>
      <div className="flex flex-row items-center justify-center">
        <button type="button" className="flex flex-row items-center gap-1 px-1 text-gray-500" onClick={modalOpen} ref={target}>
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
      {/* <LanguageModal setOpen={setOpen} /> */}
    </>
  );
}
