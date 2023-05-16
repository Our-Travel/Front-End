// import { GrFormPrevious } from 'react-icons/gr';

import { GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const SelectLocation = () => {
  const navigate = useNavigate();
  const buttonClick = () => {
    navigate('/main');
  };

  const locations = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '울산광역시', '세종시', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도'];

  return (
    <>
      <div className="block w-[450px] border-b-2 border-gray-300">
        <h2 className="text-2xl inline-block pl-6 pt-2">지역선택</h2>
        <button onClick={buttonClick}>
          <GrFormPrevious className="text-4xl inline-block relative right-60 bottom-1" />
        </button>
      </div>
      <div className="flex h-full mt-4 space-x-4 pl-2">
        <div className="inline-block w-52">
          <span className="text-lg bg-[#FF928A] block mb-3 rounded-md drop-shadow-md">광역시/도</span>
          {locations.map((location) => (
            <button key={location} className="text-ml border-[#FF787D] border-2 border-opacity-20 p-2 w-[90px] h-[60px] rounded-md m-1 bg-[#FF776D] bg-opacity-20 drop-shadow-md">
              {location}
            </button>
          ))}
        </div>

        <div className="inline-block w-52">
          <span className="text-lg bg-[#FF928A] block mb-3 rounded-md drop-shadow-md">시/군/구</span>
        </div>
      </div>
      <button className="border-2 bg-[#767676] text-white rounded-md p-1 mr-3 w-20">취소</button>
      <button className="border-2 bg-[#FF626F] text-white rounded-md p-1 w-20">확인</button>
    </>
  );
};
export default SelectLocation;
