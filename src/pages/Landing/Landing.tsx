import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { Button, LoginKakao, LoginGoogle } from '../../components/Button/Button';
import ChoiceTab from 'components/SignIn/ChoiceTab';
import { useNavigate } from 'react-router-dom';
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../components/utilCss/landingSwiper.css';
import { langConvert } from 'Atom/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';
import { cls } from 'util/util';
import TranslationButton from 'components/Button/TranslationButton';

const promotionImg = [
  { title: 'welcome Korea', imgSrc: '/assets/square1.png' },
  { title: '경복궁', imgSrc: '/assets/square2.png' },
  { title: '부산으로 간다', imgSrc: '/assets/square3.png' },
];

export default function Landing() {
  const [modal, setModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  const isOpen = () => setModal(!modal);

  return (
    <div className="relative h-full">
      <div className="w-20 h-20 mx-auto py-4 mb-8">
        <Logo />
      </div>
      <TranslationButton />
      <Swiper pagination={{ clickable: true }} modules={[Pagination, Autoplay, A11y]} autoplay={{ delay: 3000, disableOnInteraction: false }} loop={true}>
        {promotionImg.map(({ title, imgSrc }, index) => (
          <SwiperSlide key={index} className="landingSlide">
            <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-5">
        <div className="mx-4">
          <Button name={'LOG_IN'} page={true} active={active} onClick={() => navigate('/signin')} />
        </div>
        <div className="text-center my-7">
          <div className="flex items-center">
            <div className="flex-grow border-b"></div>
            <div className="px-2 text-gray-500 text-xs">{m('SOCIAL_LOGIN')}</div>
            <div className="flex-grow border-b"></div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-8">
          <LoginKakao />
          <LoginGoogle />
        </div>
      </div>
      <div className="w-full">
        <ChoiceTab />
      </div>
    </div>
  );
}
