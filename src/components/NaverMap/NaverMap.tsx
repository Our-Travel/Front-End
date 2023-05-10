import React, { useEffect } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import Spinner from '../../shared/Spinner';
import axios from 'axios';
import { latingDummy } from '../../util/dummy';

declare global {
  interface Window {
    naver: any;
  }
}
const NaverMap = () => {
  const { naver } = window;
  const location = useGeolocation();
  useEffect(() => {
    console.log(location.coordinates?.lat, location.coordinates?.lng);
    const mapDiv = document.getElementById('map');
    if (location.loaded && naver.maps) {
      const mapOptions = {
        center: new naver.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
        zoom: 100,
        zoomControl: true,
      };
      const map = new naver.maps.Map('map', mapOptions);
      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
        map,
        icon: {
          url: ' ',
          size: new window.naver.maps.Size(60, 60),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
      });
      for (let i = 0; i < latingDummy.length; i++) {
        const otherMarkers = new naver.maps.Marker({
          position: new naver.maps.LatLng(latingDummy[i].lat, latingDummy[i].lng),
          map,
        });
      }
    }
  }, [location.loaded]);

  return (
    <div className="w-full">
      <div id="map" className="w-full h-[700px]" />
      {!location.loaded && <Spinner />}
    </div>
  );
};

export default NaverMap;
