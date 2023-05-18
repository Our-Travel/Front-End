// import React, { useEffect, useState } from 'react';
// import useGeolocation from '../../hooks/useGeolocation';
// import Spinner from '../../shared/Spinner';
// import axios from 'axios';
// import { latingDummy } from '../../util/dummy';

// declare global {
//   interface Window {
//     naver: any;
//   }
// }
// const NaverMap = () => {
//   const { naver } = window;
//   const location = useGeolocation();
//   const [loc, setLoc] = useState('');
//   const [mapPoint, setMapPoint] = useState({ x: null, y: null });

//   useEffect(() => {
//     console.log(location.coordinates?.lat, location.coordinates?.lng);
//     const mapDiv = document.getElementById('map');
//     // 현재위치
//     if (location.loaded && naver.maps) {
//       const mapOptions = {
//         center: new naver.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
//         zoom: 100,
//         zoomControl: true,
//       };
//       const map = new naver.maps.Map('map', mapOptions);

//       const currentMarker = new naver.maps.Marker({
//         position: new naver.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
//         map,
//         // 마커 아이콘 커스텀
//         icon: {
//           url: ' ',
//           size: new window.naver.maps.Size(60, 60),
//           origin: new naver.maps.Point(0, 0),
//           anchor: new naver.maps.Point(25, 26),
//         },
//       });
//       // 주변 마커 찍기
//       for (let i = 0; i < latingDummy.length; i++) {
//         new naver.maps.Marker({
//           position: new naver.maps.LatLng(latingDummy[i].lat, latingDummy[i].lng),
//           map,
//         });
//       }
//     }
//   }, [location.loaded]);

//   return (
//     <div className="w-full">
//       <div id="map" className="w-full h-[700px]" />
//       {!location.loaded && <Spinner />}
//     </div>
//   );
// };

// export default NaverMap;

import React, { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap as Nmap, Marker, useNavermaps } from 'react-naver-maps';
import useGeolocation from '../../hooks/useGeolocation';
import Spinner from '../../shared/Spinner';

const NaverMap = () => {
  const navermaps = useNavermaps();
  const location = useGeolocation();
  useEffect(() => {
    console.log(location.coordinates?.lat, location.coordinates?.lng);
  }, [location.loaded]);
  return (
    <>
      {location.loaded ? (
        <MapDiv className="h-[700px] w-full">
          <Nmap zoomControl={true} scaleControl={true} defaultCenter={new navermaps.LatLng(location.coordinates?.lat, location.coordinates?.lng)} defaultZoom={15}>
            <Marker defaultPosition={new navermaps.LatLng(location.coordinates?.lat, location.coordinates?.lng)} />
          </Nmap>
        </MapDiv>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default NaverMap;