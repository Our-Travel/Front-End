import Header from '../../components/Header/Header';
import regions from './../../util/region';
const SelectLocation = () => {
  const region = regions;
  return (
    <>
      <Header title={'지역선택'} back={true} icon={''} />
      <div className="flex  mt-4 space-x-4 pl-2">
        <div className="inline-block">
          {region.map((region) => (
            <button key={region.value} className="text-ml border-[#FF787D] border-2 border-opacity-20 p-2 w-[200px] h-[60px] rounded-md m-1 bg-[#FF776D] bg-opacity-20 drop-shadow-md">
              {region.key}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default SelectLocation;
