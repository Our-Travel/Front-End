import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Main/Banner';
import GraphComponent from '../../components/Main/GraphComponent';
import MapComponent from '../../components/Main/MapComponent';

const Main = () => {
  const [showMap, setShowMap] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    handleGraphButtonClick();
  }, []);

  const handleGraphButtonClick = () => {
    setShowMap(false);
    setShowGraph(true);
    setPath('tourist'); // 버튼이 선택되면 path를 업데이트
  };
  const handleMapButtonClick = () => {
    setShowMap(true);
    setShowGraph(false);
    setPath('host'); // 버튼이 선택되면 path를 업데이트
  };

  const [path, setPath] = useState('tourist'); // 예시로 초기 path를 'tourist'로 설정

  const getName = (selected: string, componentName: string) => {
    return selected === componentName ? 'border-b-[3px]' : '';
  };

  return (
    <div>
      <Header title={'메인'} back={false} icon={undefined} />

      <Banner />
      <div className="text-xl font-semibold -translate-y-4">
        <div className="flex justify-center w-full space-x-16 ">
          <button className={`h-10 hover:scale-110 transition-transform border-main-color ${getName(path, 'tourist')}`} onClick={handleGraphButtonClick}>
            방문객수
          </button>
          <button className={`h-10 hover:scale-110 transition-transform  border-main-color ${getName(path, 'host')}`} onClick={handleMapButtonClick}>
            HOST 등록수
          </button>
        </div>
        {showMap && <MapComponent />}
        {showGraph && <GraphComponent />}
      </div>
    </>
  );
};

export default Main;
