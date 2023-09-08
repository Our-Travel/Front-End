import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import regions from './../../util/region';

const SelectLocation = () => {
  return (
    <>
      <Header title={'지역선택'} back={true} icon={''} />
      <div className="mt-6 px-4">
        <ul className="grid grid-cols-2 gap-4">
          {regions.map((region) => (
            <Link key={region.value} to={`/main/hostlist/${region.value}/${region.key}`}>
              <li className="flex items-center justify-center h-14 2xl:h-16 border rounded-lg shadow-md text-lg effectArea">
                <span>{region.key}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
export default SelectLocation;
