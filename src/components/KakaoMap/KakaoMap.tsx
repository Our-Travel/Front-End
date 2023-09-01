import React, { useEffect, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import Spinner from '../../shared/Spinner';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const location = useGeolocation();
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      let options = {
        center: new window.kakao.maps.LatLng(37.506836, 127.096717),
        level: 1,
      };

      if (location.loaded && location.coordinates) {
        options.center = new window.kakao.maps.LatLng(location.coordinates.lat, location.coordinates.lng);
      }

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, [location]);

  return (
    <>
      <div id="map" className="w-full h-screen"></div>
    </>
  );
};

export default KakaoMap;
