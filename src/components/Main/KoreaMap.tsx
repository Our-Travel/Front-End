import React, { MouseEvent, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mapData from './mapData';
import mapText from './mapText';
import useFetch from 'hooks/useFetch';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const KoreaMap = () => {
  const { hostDataCount, hostMapData } = useFetch();
  const navigate = useNavigate();
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  const handleLocation = (e: MouseEvent<SVGElement> | KeyboardEvent<SVGElement>) => {
    const mouse = e as MouseEvent<SVGElement>;
    const keyboard = e as KeyboardEvent<SVGElement>;
    const mouseItem = mouse.target as SVGElement;

    if ((e.type === 'click' && (mouseItem.tagName === 'path' || mouseItem.tagName === 'tspan')) || keyboard.key === 'Enter') {
      navigate('/main/selectLocation');
    }
  };

  useEffect(() => {
    hostDataCount();
  }, []);

  return (
    <div className="w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={mapData.viewBox} className="svgStyle svgBig" role="group" aria-label={mapData.label}>
        <g role="group" onClick={handleLocation}>
          <g>
            {mapData.locations.map((location) => (
              <g key={location.id} id={location.id} focusable={true} className="pathStyle" onKeyDown={handleLocation}>
                <path d={location.path} aria-label={location.name} tabIndex={0} className="focus:fill-red-300 outline-none" />
              </g>
            ))}
          </g>
          <g>
            {mapText.mapInfo.map((item) => (
              <g key={item.name} className="fill-black stroke-0 text-2xl cursor-pointer outline-none" transform={`translate(${item.x}, ${item.y})`}>
                <text className="hover:fill-main-color hover:scale-125">{hostMapData(item.value) ? <tspan>{`${m(item.name)}(${hostMapData(item.value)})`}</tspan> : <tspan>{m(item.name)}</tspan>}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default KoreaMap;
