import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Header from '../../components/Header/Header';
import Banner from '../../components/Main/Banner';
import GraphComponent from '../../components/Main/GraphComponent';
import KoreaMapChart from '../../components/Main/KoreaMapChart';

const Main = () => {
  const [showGraph, setShowGraph] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

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
      <Header title={'Our_Travel'} back={false} icon={''} />
      <Banner />
      <div className="text-xl font-semibold translate-y-4">
        <div className="flex justify-center w-full space-x-16 ">
          <button className={`h-8 buttonHoverSize border-main-color ${getName(path, 'tourist')}`} onClick={handleGraphButtonClick}>
            {m('방문객수')}
          </button>
          <button className={`h-8 buttonHoverSize border-main-color ${getName(path, 'host')}`} onClick={handleMapButtonClick}>
            {m('HOST등록수')}
          </button>
        </div>
        {showGraph && <GraphComponent />}
        {showMap && <KoreaMapChart />}
      </div>
    </>
  );
};

export default Main;
