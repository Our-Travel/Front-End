import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  SwiperCore.use([Navigation, Scrollbar]);
  const banner1 = '/assets/banner1.png';
  const banner2 = '/assets/banner2.png';
  const banner3 = '/assets/banner3.png';

  const items = [{ src: banner1 }, { src: banner2 }, { src: banner3 }];

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
        className="w-full h-[120px]"
        loop={true}
        {...navigationSettings}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} className="max-w-full h-[120px] " />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
