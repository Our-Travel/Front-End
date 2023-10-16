import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import regions from './../../util/region';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const SelectLocation = () => {
  const { hostDataCount, hostMapData } = useFetch();
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  useEffect(() => {
    hostDataCount();
  }, []);

  return (
    <>
      <Header title={m('SELECT_AREA')} back={true} icon={''} />
      <div className="mt-6 px-4">
        <ul className="grid grid-cols-2 gap-4">
          {regions.map((region) => (
            <Link key={region.value} to={`/main/hostlist/${region.value}/${region.key}`}>
              <li className="flex items-center justify-center gap-1 h-14 2xl:h-16 border rounded-lg shadow-md text-lg effectArea">
                <span>{m(region.key)}</span>
                {hostMapData(region.value)}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
export default SelectLocation;
