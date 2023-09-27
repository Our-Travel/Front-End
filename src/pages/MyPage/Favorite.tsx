import React, { useState, MouseEvent } from 'react';
import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import TouristList from '../../components/TouristList/TouristList';
import Accommodation from '../../components/TouristList/Accommodation';
import { cls } from '../../util/util';

const Favorite = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.name === 'tour' ? setToggle(false) : setToggle(true);
  };

  return (
    <>
      <Header title={'즐겨찾기'} back={true} icon={''} />
      <div className="flex flex-row justify-evenly text-xl font-semibold">
        <button type="button" name="tour" onClick={handleToggle} className={cls(!toggle ? 'w-[80px] border-b-[2px] border-main-color pt-[2px]' : 'w-[80px] p-2')}>
          관광지
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
