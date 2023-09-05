import React, { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapData from './mapData';
import mapText from './mapText';

const KoreaMap = () => {
  const navigate = useNavigate();
  const [textMouse, setTextMouse] = useState<boolean>(false);
  const [textName, setTextName] = useState<string | null>('');

  const handleLocationClick = (e: MouseEvent<SVGPathElement | SVGTextElement>) => {
    const target = e.target as SVGPathElement | SVGTextElement;
    if (target.tagName === 'path' || target.tagName === 'tspan') {
      navigate('/main/selectLocation');
    }
  };

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
    <div className="w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={mapData.viewBox} className="svgStyle svgBig transition-all duration-500" role="group" aria-label={mapData.label}>
        <g role="group" onClick={handleLocationClick}>
          <g>
            {mapData.locations.map((location) => (
              <g key={location.id} id={location.id} focusable={true} className={textMouse && textName === location.name ? 'fill-red-300' : 'pathStyle'}>
                <path d={location.path} aria-label={location.name} tabIndex={0} className="focus:fill-red-300 outline-none" />
              </g>
            ))}
          </g>
          <g>
            {mapText.mapInfo.map((item) => (
              <g key={item.name} className="fill-black stroke-0 cursor-pointer outline-none" transform={`translate(${item.x}, ${item.y})`}>
                <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <tspan>{item.name}</tspan>
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default KoreaMap;
