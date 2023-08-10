import React, { useEffect, useState } from 'react';
import useGeolocation from './useGeolocation';
import axios from 'axios';

const regionCoordinates = {
  서울: { lat: 37.5665, lng: 126.978 },
  부산: { lat: 35.1796, lng: 129.0756 },
  대구: { lat: 35.8714, lng: 128.6014 },
  인천: { lat: 37.4563, lng: 126.7052 },
  광주: { lat: 35.1595, lng: 126.8526 },
  대전: { lat: 36.3504, lng: 127.3845 },
  울산: { lat: 35.5384, lng: 129.3114 },
  세종: { lat: 36.4801, lng: 127.2882 },
  경기: { lat: 37.4138, lng: 127.5183 },
  강원: { lat: 37.8854, lng: 127.729 },
  충청북도: { lat: 36.6285, lng: 127.9293 },
  충청남도: { lat: 36.6588, lng: 126.6722 },
  전라북도: { lat: 35.7165, lng: 127.1443 },
  전라남도: { lat: 34.8194, lng: 126.893 },
  경상북도: { lat: 36.4919, lng: 128.8889 },
  경상남도: { lat: 35.4606, lng: 128.2132 },
  제주도: { lat: 33.4996, lng: 126.5312 },
};

function addressGetter() {
  const location = useGeolocation();
  const [address, setAddress] = useState('');
  // const latitude = location.coordinates?.lat;
  // const longitude = location.coordinates?.lng;

  const coordinates = regionCoordinates['서울'];
  const { lat, lng } = coordinates;
  const latitude = lat;
  const longitude = lng;

  useEffect(() => {
    if (latitude && longitude) {
      const fetchAddress = async () => {
        try {
          const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`, {
            headers: {
              Authorization: 'KakaoAK' + ' ' + '65a367e789f592987385f320053dcea5',
            },
          });

          const locations = response.data.documents[0];
          const formattedAddress = `${locations.address.region_1depth_name}`;
          console.log(locations);

          setAddress(formattedAddress);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAddress();
    }
  }, [latitude, longitude]);

  return address;
}

export default addressGetter;
