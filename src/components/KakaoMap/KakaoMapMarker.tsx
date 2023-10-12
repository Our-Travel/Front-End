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
  // const [clickIndex, setClickIndex] = useState<Number | null>(null);
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
    // if (normalSrc === '/map/markerEllipse3.svg') markerSize = new window.kakao.maps.Size(18, 18);
    // else markerSize = new window.kakao.maps.Size(28, 43);
    let clickmarkerSize = new window.kakao.maps.Size(24, 28);
    // let clickmarkerSize = new window.kakao.maps.Size(28, 43);
    let markerSrc = `/marker${selectedButtonIndex}.png`;

    // let normalImage = createMarkerImage(normalSrc, markerSize),
    let overImage = createMarkerImage(markerSrc, clickmarkerSize);
    // clickImage = createMarkerImage(markerSrc, clickmarkerSize);

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

  console.log(locationList);

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

  // initMarkers(null);

  // console.log(locationList);

  // console.log(locationList[0]);
  // addMarker(new kakao.maps.LatLng(locationList[0].latitude, locationList[0].longitude));
  // console.log(locationList);

  // ps.categorySearch('', placesSearchCB, { useMapBounds: true });
  // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  // function placesSearchCB(data: any, status: any, pagination: any) {
  //   if (status === window.kakao.maps.services.Status.OK) {
  //     for (var i = 0; i < data.length; i++) {
  //       displayMarker(data[i]);
  //     }
  //   }
  // }

  // function displayMarker(place: any) {
  //   // 마커를 생성하고 지도에 표시합니다
  //   var marker = new kakao.maps.Marker({
  //     map: map,
  //     position: new kakao.maps.LatLng(place.y, place.x),
  //   });

  //   var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  //   // 마커에 클릭이벤트를 등록합니다
  //   kakao.maps.event.addListener(marker, 'click', function () {
  //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
  //     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
  //     infowindow.open(map, marker);
  //   });
  // }

  return <div>{/* {locationList && <KakaoMapModal setModalClose={setModalClose} />} */}</div>;
};

export default KaKaoMapMarker;
