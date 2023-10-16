import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import type { Location, LocationArr } from './KakaoMap';
import KakaoMapModal from './KakaoMapModal';

const { kakao } = window;

const useDidMountEffect = (func: any, deps: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

const KaKaoMapMarker = ({ locationList, map, modalShow, setClickIndex, selectedButtonIndex }: any) => {
  const [positionList, setPositionList] = useState<any | null>(null);
  const [modalClose, setModalClose] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);

  const ps = new kakao.maps.services.Places(map);

  function makePositionArr() {
    let points: any = [];
    locationList.map((item: Location) => {
      let la = item.latitude;
      let lo = item.longitude;
      points.push(new window.kakao.maps.LatLng(la, lo));
    });
    setPositionList(points);
  }

  function createMarkerImage(markerSrc: any, markerSize: any) {
    let markerImage = new window.kakao.maps.MarkerImage(markerSrc, markerSize);
    return markerImage;
  }

  function addMarker(position: any, contentId: Number) {
    let markerSize = '';
    let clickmarkerSize = new window.kakao.maps.Size(24, 28);
    let markerSrc = `/assets/marker${selectedButtonIndex}.png`;

    let overImage = createMarkerImage(markerSrc, clickmarkerSize);

    let marker = new window.kakao.maps.Marker({
      map: map,
      position: position,
      image: overImage,
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      modalShow();
      setClickIndex(contentId);
    });

    marker.overImage = overImage;
    return marker;
  }

  useDidMountEffect(() => {
    setMarkers([]);
    initMarkers(null);
    let points = [];
    const handleMarker = (marker: any) => {
      setMarkers((prevList) => [...prevList, marker]);
    };

    locationList.map((item: any) => {
      let marker = addMarker(new kakao.maps.LatLng(item.latitude, item.longitude), item.content_id);
      handleMarker(marker);
    });
  }, [locationList]);

  function initMarkers(map: any) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  useEffect(() => {
    initMarkers(map);
  }, [markers]);

  return <div></div>;
};

export default KaKaoMapMarker;
