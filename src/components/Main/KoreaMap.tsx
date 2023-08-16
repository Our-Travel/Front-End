import React, { MouseEvent } from 'react';
import mapData from './mapData';
import mapText from './mapText';

interface locationClick {
  handleLocationClick: (e: MouseEvent<SVGPathElement | SVGTextElement>) => void;
}

const KoreaMap = ({ handleLocationClick }: locationClick) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={mapData.viewBox} className="svgStyle w-11/12" role="group" aria-label={mapData.label}>
        <g role="group">
          {mapData.locations.map((location) => (
            <g key={location.id} id={location.id} focusable={true}>
              <path d={location.path} aria-label={location.name} tabIndex={0} onClick={handleLocationClick} className="hover:fill-red-200 cursor-pointer outline-none" />
            </g>
          ))}
        </g>
        <g role="group">
          {mapText.mapInfo.map((item, index) => (
            <g key={index} className="fill-black stroke-0" transform={`translate(${item.x}, ${item.y})`}>
              <text className="hover:fill-red-400 cursor-pointer" onClick={handleLocationClick}>
                <tspan>{item.name}</tspan>
              </text>
            </g>
          ))}
        </g>
      </svg>
    </>
  );
};

export default KoreaMap;
