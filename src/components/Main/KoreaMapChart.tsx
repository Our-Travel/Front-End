import KoreaMap from './KoreaMap';
import { GrFormLocation } from 'react-icons/gr';

const KoreaMapChart = () => {
  return (
    <>
      <div className="w-full text-left text-base px-2 2xl:text-lg 2xl:mt-4 transition-all duration-500">
        <p className="flex items-center font-semibold text-gray-600">
          <GrFormLocation className="w-8 h-8 inline-block font-normal" />
          해당 <b className="text-main-color">지역의 등록된 Host 수</b>를 참고해 클릭해보세요.
        </p>
      </div>
      <KoreaMap />
    </>
  );
};

export default KoreaMapChart;
