import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Main/Banner';
import GraphComponent from '../../components/Main/GraphComponent';
import KoreaMapChart from '../../components/Main/KoreaMapChart';

const Main = () => {
  const [showMap, setShowMap] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    handleGraphButtonClick();
  }, []);

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
      <div className="w-full h-full flex flex-col gap-1 text-xl font-semibold -my-4">
        <div className="flex justify-evenly">
          <button className={`h-10 hover:scale-110 transition-transform border-main-color ${getName(path, 'tourist')}`} onClick={handleGraphButtonClick}>
            방문객수
          </button>
          <button className={`h-10 hover:scale-110 transition-transform  border-main-color ${getName(path, 'host')}`} onClick={handleMapButtonClick}>
            HOST 등록수
          </button>
        </div>
        {showGraph && <GraphComponent />}
        {showMap && <KoreaMapChart />}
      </div>
    </>
  );
};

export default Main;
