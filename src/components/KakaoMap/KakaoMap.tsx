import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import Spinner from '../../shared/Spinner';
import TourModal from '../TouristList/TourModal';
import axios, { AxiosResponse } from 'axios';
import { aroundLoc, accommodation } from '../../Atom/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Map from './../../pages/Map/Map';
import KakaoMapMarker from './KakaoMapMarker';
import KakaoMapModal from './KakaoMapModal';
import { Message } from '@stomp/stompjs';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  token: string;
  selectedButtonIndex: number;
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

export interface Location {
  address: string;
  content_id: number;
  content_type_id: number;
  home_page: string;
  image: string;
  latitude: number;
  longitude: number;
  over_view: string;
  tel: string;
  tel_name: string;
  title: string;
}

export interface LocationArr {
  address: string;
  content_id: number;
  content_type_id: number;
  home_page: string;
  image: string;
  latitude: number;
  longitude: number;
  over_view: string;
  tel: string;
  tel_name: string;
  title: string;
}
[];

const KakaoMap = ({ token, selectedButtonIndex }: MapProps) => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  const location = useGeolocation();
  const [mapToggle, setMapToggle] = useState<boolean>(false);
  const [aroundPlace, setAroundPlace] = useRecoilState(aroundLoc);
  const setCcommo = useSetRecoilState(accommodation);
  const [selectPost, setSelectPost] = useState<Place | null>(null);
  const handleMapToggle = (place: Place) => {
    setSelectPost(place);
    setMapToggle(!mapToggle);
  };
  const [locationList, setLocationList] = useState<Array<Location>>([]);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      let options = {
        center: new window.kakao.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
        level: 7,
      };

      if (location.loaded && location.coordinates) {
        options.center = new window.kakao.maps.LatLng(location.coordinates.lat, location.coordinates.lng);
      }

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, [location]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_REST_API_SERVER}/local-place?contentTypeId=${selectedButtonIndex}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        let locationArr = response.data.data;
        setLocationList(locationArr);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.msg);
        }
      }
    };
    getData();
  }, [selectedButtonIndex]);

  const [modalClose, setModalClose] = useState(false);
  const [clickIndex, setClickIndex] = useState<Number | null>(null);

  const modalShow = () => {
    setModalClose(true);
  };

  return (
    <>
      <div id="map" className="w-full h-[90vh]">
        {locationList && map && selectedButtonIndex && <KakaoMapMarker locationList={locationList} map={map} modalShow={modalShow} setClickIndex={setClickIndex} selectedButtonIndex={selectedButtonIndex} />}
        {locationList && map && modalClose && clickIndex && <KakaoMapModal locationList={locationList} setModalClose={setModalClose} clickIndex={clickIndex} />}
      </div>
    </>
  );
};

export default KakaoMap;
