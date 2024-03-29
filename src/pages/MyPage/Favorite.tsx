import React, { useState, MouseEvent, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TouristList from '../../components/TouristList/TouristList';
import { cls } from '../../util/util';
import contentTypes from 'util/contentType';
import { langConvert } from 'Atom/atom';
import { useRecoilValue } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';

const Favorite = () => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const [toggle, setToggle] = useState<string>(m('관광지') || m('Tourist'));
  const [tourType, setTourType] = useState<number>(12);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const name = target.name;
    const value = target.value;

    setTourType(Number(value));
    setToggle(name);
  };

  return (
    <>
      <Header title={'FAVORITE'} back={true} icon={''} />
      <div className="flex flex-row justify-evenly text-[16px] font-semibold ">
        {contentTypes.map((el) => {
          return (
            <button type="button" value={el.value} name={el.key} onClick={handleToggle} className={cls('focus:outline-none w-[80px] py-1 h-20  hover:text-white hover:bg-main-color', toggle == el.key ? 'border-b-2 border-main-color' : '')}>
              {m(el.key)}
            </button>
          );
        })}
      </div>
      {toggle && <TouristList tourType={tourType} />}
    </>
  );
};

export default Favorite;
