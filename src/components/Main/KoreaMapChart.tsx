import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import KoreaMap from './KoreaMap';
import { GrFormLocation } from 'react-icons/gr';

const KoreaMapChart = () => {
  const navigate = useNavigate();

  const handleLocationClick = (e: MouseEvent<SVGPathElement | SVGTextElement>) => {
    const target = e.target as SVGPathElement | SVGTextElement;
    if (target.tagName === 'path' || target.tagName === 'tspan') {
      navigate('/main/selectLocation');
    }
  };

  return (
    <>
      <div className="w-full text-left px-2">
        <GrFormLocation className="w-10 h-10 inline-block font-normal" />
        <span className="font-semibold text-gray-600 text-base">
          해당 <b className="text-main-color">지역을 클릭해</b> Host를 찾아보세요.
        </span>
      </div>
      <KoreaMap handleLocationClick={handleLocationClick} />
    </>
  );
};

export default KoreaMapChart;
