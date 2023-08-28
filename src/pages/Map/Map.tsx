import React from 'react';
import KakaoMap from '../../components/KakaoMap/KakaoMap';

interface MapProps {
  token: string;
}

const Map = ({ token }: MapProps) => {
  return (
    <div className="h-screen">
      <h1>map페이지</h1>
      <div className="p-1">
        <KakaoMap />
      </div>
    </div>
  );
};

export default Map;
