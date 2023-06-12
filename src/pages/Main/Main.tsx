import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Banner from '../../components/Main/Banner';
import GraphComponent from '../../components/Main/GraphComponent';
import MapComponent from '../../components/Main/MapComponent';
import Navigation from '../../components/Navigation/Navigation';
import { GrFormLocation } from 'react-icons/gr';
const Main = () => {
  const [showMap, setShowMap] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const handleMapButtonClick = () => {
    setShowMap(true);
    setShowGraph(false);
  };

  const handleGraphButtonClick = () => {
    setShowMap(false);
    setShowGraph(true);
  };

  return (
    <div>
      <Header title={'메인'} back={false} icon={undefined} />

      <Banner />
      <div className="block mr-48 pt-0 mt-0">
        <GrFormLocation className="w-10 h-10 inline-block" />
        <span className="">Host를 찾아보세요</span>
      </div>

      <div className="block m-auto text-xl font-semibold ">
        <button className="float w-24 h-10 hover:border-b-[3px] hover:pt-[3px] border-main-color " onClick={handleGraphButtonClick}>
          방문객수
        </button>
        <button className="ml-20 float w-30 h-10 hover:border-b-[3px] hover:pt-[3px] border-main-color " onClick={handleMapButtonClick}>
          HOST 등록수
        </button>
        {showMap && <MapComponent />}
        {showGraph && <GraphComponent />}
      </div>
    </div>
  );
};

export default Main;
