import KoreaMap from './KoreaMap';
import { BiCurrentLocation } from 'react-icons/bi';

const KoreaMapChart = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center gap-1 mt-2 font-semibold text-base 2xl:mt-5 transition-all duration-500">
        <BiCurrentLocation className="w-5 h-5" />
        <p>
          해당 지역의 <b className="text-main-color">등록된 Host 수</b>를 참고해 <b className="text-main-color">클릭</b>해 보세요.
        </p>
      </div>
      <KoreaMap />
    </>
  );
};

export default KoreaMapChart;
