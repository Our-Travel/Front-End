import KoreaMap from './KoreaMap';
import { BiCurrentLocation } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const KoreaMapChart = () => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  return (
    <>
      <div className="w-full flex items-center justify-center gap-1 mt-2 font-semibold text-base 2xl:mt-5 transition-all duration-500">
        <BiCurrentLocation className="w-5 h-5" />
        <p>{m('HOST_COUNT_CLICK')}</p>
      </div>
      <KoreaMap />
    </>
  );
};

export default KoreaMapChart;
