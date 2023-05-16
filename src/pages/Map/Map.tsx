import React from 'react';
import NaverMap from '../../components/NaverMap/NaverMap';

const Map = () => {
  return (
    <div className="h-screen">
      <h1>map페이지</h1>
      <div className="p-1">
        <NaverMap />
      </div>
    </div>
  );
};

export default Map;
