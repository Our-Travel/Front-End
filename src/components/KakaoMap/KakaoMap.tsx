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
  const [locationList, setLocationList] = useState<Array<Location>>([]);
  // const [positionList, setPositionList] = useState<any | null>(null);

  const [markers, setMarkers] = useState([]);

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_REST_API_SERVER}/local-place`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let locationArr = response.data.data;
        setLocationList(locationArr);
      } catch (error) {
        alert('데이터를 불러오는 과정에서 에러가 발생했습니다!!');
      }
    };
    getData();
  }, []);

  // function makePositionArr() {
  //   let points: any = [];
  //   locationList.map((item: Location) => {
  //     let la = item.latitude;
  //     let lo = item.longitude;
  //     points.push(new window.kakao.maps.LatLng(la, lo));
  //   });
  //   // locationList?.map(({ latitude, longitude }, index: Number) => {
  //   //   points.push(new window.kakao.maps.LatLng(latitude, longitude));
  //   // });
  //   setPositionList(points);
  // }

  // addMarker(new window.kakao.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng));

  // console.log(locationList);
  // console.log(li.map((i) => console.log(i)));

  // let zoomControl = new window.kakao.maps.ZoomControl();
  // map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

  function createMarkerImage(markerSrc: any, markerSize: any) {
    let markerImage = new window.kakao.maps.MarkerImage(markerSrc, markerSize);

    return markerImage;
  }

  // let selectedMarker: any = null;

  function addMarker(position: any) {
    let markerSize = '';
    // if (normalSrc === '/map/markerEllipse3.svg') markerSize = new window.kakao.maps.Size(18, 18);
    // else markerSize = new window.kakao.maps.Size(28, 43);
    let clickmarkerSize = new window.kakao.maps.Size(28, 43);
    let markerSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    // let normalImage = createMarkerImage(normalSrc, markerSize),
    let overImage = createMarkerImage(markerSrc, clickmarkerSize),
      clickImage = createMarkerImage(markerSrc, clickmarkerSize);

    let marker = new window.kakao.maps.Marker({
      map: map,
      position: position,
      image: overImage,
    });

    marker.overImage = overImage;

    // if (!selectedMarker || selectedMarker !== marker) {
    //   !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

    //   marker.setImage(clickImage);
    // }

    // selectedMarker = marker;
    // setSelected(marker);

    return marker;
  }

  const [modalClose, setModalClose] = useState(false);
  const [clickIndex, setClickIndex] = useState<Number | null>(null);

  const modalShow = () => {
    // if (!(e.target.tagName === "svg" || e.target.tagName === "path")) {
    // setIndex(e.currentTarget.id);
    setModalClose(true);
    // }
  };

  return (
    <>
      <div id="map" className="w-full h-screen">
        {locationList && map && <KakaoMapMarker locationList={locationList} map={map} modalShow={modalShow} setClickIndex={setClickIndex} />}
        {locationList && map && modalClose && clickIndex && <KakaoMapModal locationList={locationList} setModalClose={setModalClose} clickIndex={clickIndex} />}
      </div>
    </>
  );
};

export default KakaoMap;
