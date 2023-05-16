import React from 'react';
import { tourDummy as dummy } from '../../util/dummy';

const Accommodation = () => {
  return (
    <>
      <>
        {dummy.map((el, index) => (
          <div key={index} className="listStyles border-b-2 border-red-400">
            <div className="w-[60px] bg-pink-300 p-2 rounded-lg">
              <img src={el.img} />
            </div>
            <div className="flex flex-col text-left w-[250px]">
              <span>{el.title}</span>
              <span>{el.subtitle}</span>
            </div>
            <p className="text-gray-400">{el.km}</p>
          </div>
        ))}
      </>
    </>
  );
};

export default Accommodation;
