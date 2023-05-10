import React from 'react';
import { tourDummy as dummy } from '../../util/dummy';

const Accommodation = () => {
  return (
    <>
      <>
        {dummy.map((el) => (
          <div className="listStyles">
            <img src={el.img} />
            <div className="flex flex-col text-left w-[250px]">
              <span>{el.title}</span>
              <span>{el.subtitle}</span>
            </div>
            <p>{el.km}</p>
          </div>
        ))}
      </>
    </>
  );
};

export default Accommodation;
