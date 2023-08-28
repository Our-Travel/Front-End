import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Main/Banner';
import GraphComponent from '../../components/Main/GraphComponent';
import MapComponent from '../../components/Main/MapComponent';

const Main = () => {
  const [showGraph, setShowGraph] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const handleGraphButtonClick = () => {
    setShowMap(false);
    setShowGraph(true);
    setPath('tourist');
  };
  const handleMapButtonClick = () => {
    setShowMap(true);
    setShowGraph(false);
    setPath('host');
  };

  const [path, setPath] = useState('tourist');

  const getName = (selected: string, componentName: string) => {
    return selected === componentName ? 'border-b-[3px]' : '';
  };

  return (
    <>
      <Header title={'메인'} back={false} icon={''} />

      <Banner />
      <div className="text-xl font-semibold -translate-y-4">
        <div className="flex justify-center w-full space-x-16 ">
          <button className={`h-10 buttonHoverSize border-main-color ${getName(path, 'tourist')}`} onClick={handleGraphButtonClick}>
            방문객수
          </button>
          <button className={`h-10 buttonHoverSize border-main-color ${getName(path, 'host')}`} onClick={handleMapButtonClick}>
            HOST 등록수
          </button>
        </div>
        {showGraph && <GraphComponent />}
        {showMap && <MapComponent />}
      </div>
    </>
  );
};

export default Main;
