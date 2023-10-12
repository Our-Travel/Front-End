import React, { useState, MouseEvent } from 'react';
import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import TouristList from '../../components/TouristList/TouristList';
import Accommodation from '../../components/TouristList/Accommodation';
import { cls } from '../../util/util';

const Favorite = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleList, setToggleList] = useState<boolean[]>([false]);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    // target.name === 'tour' ? setToggle(false) : setToggle(true);
    // setToggleList(true)
    // toggleList[target.id] = true;
  };
  // const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
  //   const target = e.target as HTMLButtonElement;
  //   target.name === 'tour' ? setToggle(false) : setToggle(true);
  // };

  return (
    <>
      <Header title={'즐겨찾기'} back={true} icon={''} />
      <div className="flex flex-row justify-evenly text-sm font-semibold">
        <button type="button" name="tour" id="0" onClick={handleToggle} className={cls(!toggleList[0] ? 'w-[80px] border-b-[2px] border-main-color pt-[2px]' : 'w-[80px] p-2')}>
          관광지
        </button>
        <button type="button" name="culture" onClick={handleToggle} className={cls(!toggle ? 'w-[80px] border-b-[2px] border-main-color pt-[2px]' : 'w-[80px] p-2')}>
          문화시설
        </button>
        <button type="button" name="festival" onClick={handleToggle} className={cls(!toggle ? 'w-[80px] border-b-[2px] border-main-color pt-[2px]' : 'w-[80px] p-2')}>
          축제공연행사
        </button>
        <button type="button" name="course" onClick={handleToggle} className={cls(!toggle ? 'w-[80px] border-b-[2px] border-main-color pt-[2px]' : 'w-[80px] p-2')}>
          여행코스
        </button>
        <button type="button" name="leports" onClick={handleToggle} className={cls(!toggle ? 'w-[80px] border-b-[2px] border-main-color pt-[2px]' : 'w-[80px] p-2')}>
          레포츠
        </button>
        <button type="button" name="Accommodation" onClick={handleToggle} className={cls(toggle ? 'w-[80px] border-b-[2px] border-main-color pt-[2px]' : 'w-[80px] p-2')}>
          숙박
        </button>
      </div>
      {toggle ? <Accommodation /> : <TouristList />}
    </>
  );
};

export default Favorite;
