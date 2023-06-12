import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SouthKoreaSvgMap } from './SouthKoreaSvgMap';

type MapDataType = { [location: string]: number };

const DefaultTooltip = ({ tooltipStyle, children }: any) => {
  return (
    <div
      style={{
        borderRadius: '10px',
        color: '#black',
        position: 'fixed',
        minWidth: '80px',
        padding: '10px',
        border: `1px solid`,
        backgroundColor: '#fff',
        ...tooltipStyle,
      }}
    >
      {children}
    </div>
  );
};

export const SimpleSouthKoreaMapChart = ({ darkMode = false, data, unit = '개', setColorByCount, customTooltip }: any) => {
  const [mapData, setMapData] = useState<MapDataType>({});
  const [tooltipMsg, setTooltipMsg] = useState<string>('');
  const [tooltipStyle, setTooltipStyle] = useState<any>(false);
  const navigate = useNavigate();

  const handleLocationClick = (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    const location = event.currentTarget.getAttribute('name');
    navigate('/main/selectLocation');
  };

  useEffect(() => {
    const items = data.reduce((acc: any, item: any) => {
      return {
        ...acc,
        [item.locale]: item.count,
      };
    }, {});

    setMapData(items);
  }, [data]);

  const handleLocationMouseOver = (event: any) => {
    const location = event.target.attributes.name.value;
    const count = mapData[location] ? mapData[location] : 0;
    setTooltipMsg(`${location}: ${count}${unit}`);
  };

  const handleLocationMouseOut = () => {
    setTooltipStyle({ display: 'none' });
  };

  const handleLocationMouseMove = (event: any) => {
    const tooltipStyle = {
      display: 'block',
      top: event.clientY - 50,
      left: event.clientX - 60,
    };
    setTooltipStyle(tooltipStyle);
  };

  return (
    <>
      <SouthKoreaSvgMap data={mapData} setColorByCount={setColorByCount} onLocationMouseOver={handleLocationMouseOver} onLocationMouseOut={handleLocationMouseOut} onLocationMouseMove={handleLocationMouseMove} onLocationClick={handleLocationClick} />
      {customTooltip ? (
        React.cloneElement(customTooltip, {
          darkMode,
          tooltipStyle,
          children: tooltipMsg,
        })
      ) : (
        <DefaultTooltip tooltipStyle={tooltipStyle}>{tooltipMsg}</DefaultTooltip>
      )}
    </>
  );
};
