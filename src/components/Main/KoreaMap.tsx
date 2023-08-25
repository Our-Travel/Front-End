import React, { MouseEvent, useCallback, useState } from 'react';
import mapData from './mapData';
import mapText from './mapText';

interface location {
  handleLocationClick: (e: MouseEvent<SVGPathElement | SVGTextElement>) => void;
}

const KoreaMap = ({ handleLocationClick }: location) => {
  const [textMouse, setTextMouse] = useState<boolean>(false);
  const [textName, setTextName] = useState<string | null>('');

  const handleMouseEnter = (e: MouseEvent<SVGTextElement>) => {
    const target = e.target as SVGTextElement;
    setTextName(target.textContent);
    setTextMouse(true);
  };

  const handleMouseLeave = () => {
    setTextName(null);
    setTextMouse(false);
  };

  return (
    <div className="relative w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={mapData.viewBox} className="svgStyle 2xl:scale-105 transition-all duration-500" role="group" aria-label={mapData.label}>
        <g role="group">
          {mapData.locations.map((location) => (
            <g key={location.id} id={location.id} focusable={true} className={textMouse && textName === location.name ? 'fill-red-300' : 'pathStyle'}>
              <path d={location.path} aria-label={location.name} tabIndex={0} onClick={handleLocationClick} className="focus:fill-red-300 outline-none" />
            </g>
          ))}
        </g>
        <g role="group">
          {mapText.mapInfo.map((item, index) => (
            <g key={index} className="fill-black stroke-0 cursor-pointer outline-none" transform={`translate(${item.x}, ${item.y})`}>
              <text onClick={handleLocationClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <tspan>{item.name}</tspan>
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default KoreaMap;
