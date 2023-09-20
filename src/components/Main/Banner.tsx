import { useRef } from 'react';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import test from '../../assets/kor.png';
import forest from '../../assets/cat.png';
import mokpo from '../../assets/udon.png';

const Banner = () => {
  SwiperCore.use([Navigation, Scrollbar]);

  const items = [{ src: test }, { src: forest }, { src: mokpo }];

  const navigationSettings = {
    onBeforeInit: (swiper: SwiperCore) => {
      swiper.navigation.update();
    },
  };
  return (
    <>
      <Swiper
        effect={'fade'}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
        className="w-[450px] h-[120px]"
        loop={true}
        {...navigationSettings}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} className="w-[450px] h-[120px] " />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
