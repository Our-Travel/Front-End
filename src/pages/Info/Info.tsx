import React, { useState } from 'react';
import { cls } from '../../util/util';
import TouristList from '../../components/TouristList/TouristList';
import Accommodation from '../../components/TouristList/Accommodation';

const Info = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const { name } = target;
    if (name === 'tour') {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  return (
    <div>
      <h1>관광지, 숙박</h1>
      <div className="h-[1px] bg-black" />
      <div className="flex px-20 justify-between">
        <button onClick={handleToggle} name="tour" className={cls(!toggle ? 'w-[80px] border-b border-solid p-3' : 'w-[80px] p-3')}>
          관광지
        </button>
        <button onClick={handleToggle} name="Accommodation" className={cls(toggle ? 'w-[80px] p-3 border-b border-solid' : 'w-[80px] p-3')}>
          숙박
        </button>
      </div>
      {toggle ? <Accommodation /> : <TouristList />}
    </div>
  );
};

export default Info;
