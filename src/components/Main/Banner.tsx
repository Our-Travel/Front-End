import { useRef } from 'react';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GrPrevious, GrNext } from 'react-icons/gr';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import test from '../../assets/test.png';
import forest from '../../assets/숲.png';
import mokpo from '../../assets/image 56.svg';

const Banner = () => {
  SwiperCore.use([Navigation, Scrollbar]);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const items = [{ src: test }, { src: forest }, { src: mokpo }];

  const navigationSettings = {
    navigation: {
      prevEl: prevRef.current, // 이전 버튼
      nextEl: nextRef.current, // 다음 버튼
    },
    onBeforeInit: (swiper: SwiperCore) => {
      if (typeof swiper.params.navigation !== 'boolean') {
        if (swiper.params.navigation) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }
      }
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
      <button ref={prevRef} className="w-[25px] h-[25px] border-[1px] border-slate-500 border-opacity-30 rounded-2xl relative bottom-16 z-10 right-44  bg-slate-300 bg-opacity-30 ">
        <GrPrevious className="w-[15px] h-[15px]  m-auto" />
      </button>
      <button ref={nextRef} className="w-[25px] h-[25px] border-[1px] border-slate-500 border-opacity-30 rounded-2xl relative bottom-16 z-10 left-44 bg-slate-300 bg-opacity-30">
        <GrNext className="w-[15px] h-[15px] m-auto " />
      </button>
    </>
  );
};

export default Banner;
