import React, { useEffect } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
declare global {
  interface Window {
    naver: any;
  }
}
const NaverMap = () => {
  const { naver } = window;
  const location = useGeolocation();
  useEffect(() => {
    const mapDiv = document.getElementById('map');
    if (location.loaded && naver.maps) {
      const mapOptions = {
        center: new naver.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
        zoom: 10,
      };
      const map = new naver.maps.Map('map', mapOptions);
      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
        map,
        icon: {
          url: '/logo129.png',
          size: new window.naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
      });
    }
  }, [location.loaded]);
  return (
    <div className="w-full">
      <div id="map" className="w-full h-[700px]" />
      {location.loaded ? JSON.stringify(location) : 'Location data not available yet.'}
    </div>
  );
};

export default NaverMap;
