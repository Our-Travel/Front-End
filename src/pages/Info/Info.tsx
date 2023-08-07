import React, { useEffect, useState } from 'react';
import { cls } from '../../util/util';
import Header from '../../components/Header/Header';
import TouristList from '../../components/TouristList/TouristList';
import Accommodation from '../../components/TouristList/Accommodation';
import axios from 'axios';
import useGeolocation from '../../hooks/useGeolocation';

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

  const { loaded, coordinates } = useGeolocation();
  console.log(coordinates?.lat, coordinates?.lng);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/local-place/hotel?latitude=${coordinates?.lat}&longitude=${coordinates?.lng}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data.msg);
      });
  }, [coordinates?.lat, coordinates?.lng, loaded]);

  return (
    <div>
      <Header title={'관광지, 숙박'} back={false} icon={''} />
      <div className="h-[1px] bg-gray-200" />
      <div className="flex px-20 justify-between mt-2 mb-4 font-bold text-gray-700">
        <button onClick={handleToggle} name="tour" className={cls(!toggle ? 'w-[80px] border-main-color border-b-2 border-solid p-3 animate-pulse' : 'w-[80px] p-3')}>
          관광지
        </button>
        <button onClick={handleToggle} name="Accommodation" className={cls(toggle ? 'w-[80px] p-3 border-main-color border-b-2 border-solid animate-pulse' : 'w-[80px] p-3')}>
          숙박
        </button>
      </div>
      {toggle ? <Accommodation /> : <TouristList />}
    </div>
  );
};

export default Info;
