import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import { Link } from 'react-router-dom';
import { BsHouses } from 'react-icons/bs';

const listTest: { name: string; info: string; km: number }[] = [
  { name: '테스트1 펜션', info: '1번 독채 숲속 뷰 입니다', km: 5 },
  { name: '테스트3 펜션', info: '3번 개별 라운지 가능', km: 8 },
  { name: '테스트2 펜션', info: '2번 오션 뷰 입니다', km: 17 },
];

export default function Favorite() {
  return (
    <div className="w-[25rem] mx-auto">
      <Header title={'즐겨찾기'} showButton={true} />
      <div className="flex flex-col gap-4 my-6 line">
        <Profile />
      </div>
      <div className="flex flex-row justify-evenly text-xl font-semibold">
        <Link to="/" className="flex items-center justify-center w-24 h-10 hover:border-b-[3px] hover:pt-[3px] border-main-color ">
          <p>관광지</p>
        </Link>
        <Link to="/" className="flex items-center justify-center w-24 h-10 hover:border-b-[3px] hover:pt-[3px] border-main-color">
          <p>숙박</p>
        </Link>
      </div>
      <ul>
        {listTest.map(({ name, info, km }, index) => (
          <li key={index} className="relative flex flex-row items-center justify-between mt-5 h-20 after:absolute after:bottom-0 hover:bg-gray-100 cursor-pointer line">
            <div className="flex flex-row items-center justify-center gap-5 h-full">
              <BsHouses className="w-11 h-11" />
              <div className="text-left leading-7">
                <h2 className="text-lg">{name}</h2>
                <p className="text-gray-500">{info}</p>
              </div>
            </div>
            <p className="text-lg">{km} Km</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
