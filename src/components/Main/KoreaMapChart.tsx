import KoreaMap from './KoreaMap';
import { GrFormLocation } from 'react-icons/gr';

const KoreaMapChart = () => {
  return (
    <>
      <div className="w-full text-left px-2 text-base 2xl:text-lg 2xl:mt-4 transition-all duration-500">
        <GrFormLocation className="w-8 h-8 inline-block font-normal" />
        <span className="font-semibold text-gray-600">
          해당 <b className="text-main-color">지역을 클릭해</b> Host를 찾아보세요.
        </span>
      </div>
      <KoreaMap />
    </>
  );
};

export default KoreaMapChart;
