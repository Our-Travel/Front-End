import React from 'react';
import NaverMap from '../../components/NaverMap/NaverMap';

interface MapProps {
  token: string;
}
const Map = ({ token }: MapProps) => {
  return (
    <div className="h-screen">
      <h1>map페이지</h1>
      <div className="p-1">
        <NaverMap token={token} />
      </div>
    </div>
  );
};

export default Map;
