import axios from 'axios';
import React, { MouseEvent, KeyboardEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mapData from './mapData';
import mapText from './mapText';

interface hostMapData {
  region_code: number;
  count: number;
}

const KoreaMap = () => {
  const navigate = useNavigate();
  const [hostMap, setHostMap] = useState<hostMapData[]>([]);

  const handleLocation = (e: MouseEvent<SVGElement> | KeyboardEvent<SVGElement>) => {
    const mouse = e as MouseEvent<SVGElement>;
    const keyboard = e as KeyboardEvent<SVGElement>;
    const mouseItem = mouse.target as SVGElement;

    if ((e.type === 'click' && (mouseItem.tagName === 'path' || mouseItem.tagName === 'tspan')) || keyboard.key === 'Enter') {
      navigate('/main/selectLocation');
    }
  };

  useEffect(() => {
    const hostDataCount = async () => {
      try {
        const url = 'https://ourtravel.site/api/dev/hosts/map';
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setHostMap(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
      }
    };
    hostDataCount();
  }, []);

  // 지역코드와 매개변수로 받은 code가 맞으면 해당 지역 등록된 host count 표시
  const hostMapData = (code: number) => {
    for (let data of hostMap) {
      if (data.region_code === code) return data.count;
    }
  };

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
                <text className="hover:fill-main-color hover:scale-125">
                  <tspan>{item.name}</tspan>
                  {hostMapData(item.value)}
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
