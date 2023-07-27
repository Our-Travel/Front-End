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

import React, { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, NaverMap as Nmap, Marker, useNavermaps, useMap } from 'react-naver-maps';
import useGeolocation from '../../hooks/useGeolocation';
import Spinner from '../../shared/Spinner';
import TourModal from '../TouristList/TourModal';
import axios from 'axios';
import { aroundLoc, accommodation } from '../../Atom/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface MapProps {
  token: string;
}
interface Place {
  address_name: string;
  distance: number;
  id: number;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

const NaverMap = ({ token }: MapProps) => {
  const navermaps = useNavermaps();
  const location = useGeolocation();
  const naverMap = useMap();
  // recoil
  const [mapToggle, setMapToggle] = useState<boolean>(false);
  const [aroundPlace, setAroundPlace] = useRecoilState(aroundLoc);
  const setCcommo = useSetRecoilState(accommodation);
  const [selectPost, setSelectPost] = useState<Place | null>(null);
  const handleMapToggle = (place: Place) => {
    setSelectPost(place);
    setMapToggle(!mapToggle);
  };

  useEffect(() => {
    if (location.loaded && location.coordinates) {
      const resAroundLoc = axios.get(`http://localhost:8080/api/local-place/spot?latitude=${location.coordinates?.lat}&longitude=${location.coordinates?.lng}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resAccommodation = axios.get(`http://localhost:8080/api/local-place/hotel?latitude=${location.coordinates?.lat}&longitude=${location.coordinates?.lng}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      axios
        .all([resAroundLoc, resAccommodation])
        .then(
          axios.spread((res1, res2) => {
            // 첫 번째 요청 결과: res1.data
            // 두 번째 요청 결과: res2.data
            setAroundPlace(res1.data.data.documents);
            setCcommo(res2.data.data.documents);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location.loaded]);

  return (
    <>
      {location.loaded && aroundPlace !== null ? (
        <>
          <MapDiv className="h-[740px] w-full relative">
            <Nmap zoomControl={true} scaleControl={true} defaultCenter={new navermaps.LatLng(location.coordinates?.lat, location.coordinates?.lng)} defaultZoom={15}>
              <Marker onClick={handleMapToggle} defaultPosition={new navermaps.LatLng(location.coordinates?.lat, location.coordinates?.lng)} />
              {aroundPlace.map((el) => (
                <div key={el.id}>
                  <Marker onClick={() => handleMapToggle(el)} position={new navermaps.LatLng(el.y, el.x)} />
                </div>
              ))}
              {mapToggle && <TourModal setModal={setMapToggle} post={selectPost} boardDetail={null} />}
            </Nmap>
          </MapDiv>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default NaverMap;
