import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import Spinner from '../../shared/Spinner';
import TourModal from '../TouristList/TourModal';
import axios from 'axios';
import { aroundLoc, accommodation } from '../../Atom/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

declare global {
  interface Window {
    kakao: any;
  }
}

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

const KakaoMap = ({ token }: MapProps) => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  const location = useGeolocation();
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
            console.log(res2.data.data.documents);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location.loaded]);

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
