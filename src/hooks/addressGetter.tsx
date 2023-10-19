import React, { useEffect, useState } from 'react';
import useGeolocation from './useGeolocation';
import axios from 'axios';

function addressGetter() {
  const location = useGeolocation();
  const [address, setAddress] = useState('');
  const latitude = location.coordinates?.lat;
  const longitude = location.coordinates?.lng;

  useEffect(() => {
    if (location.loaded) {
      const fetchAddress = async () => {
        try {
          const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`, {
            headers: {
              Authorization: 'KakaoAK' + ' ' + `${process.env.REACT_APP_REST_API_KEY}`,
            },
          });
          const locations = response.data.documents[0];
          const formattedAddress = locations.address.region_1depth_name;
          if (formattedAddress === '강원특별자치도') {
            setAddress('강원');
          } else if (formattedAddress === '전라북도') {
            setAddress('전북');
          } else if (formattedAddress === '전라남도') {
            setAddress('전남');
          } else if (formattedAddress === '경상북도') {
            setAddress('경북');
          } else if (formattedAddress === '경상남도') {
            setAddress('경남');
          } else if (formattedAddress === '세종특별자치시') {
            setAddress('세종');
          } else if (formattedAddress === '경기도') {
            setAddress('경기');
          } else if (formattedAddress === '충청남도') {
            setAddress('충남');
          } else if (formattedAddress === '충청북도') {
            setAddress('충북');
          } else if (formattedAddress === '제주특별자치도') {
            setAddress('제주');
          } else {
            setAddress(formattedAddress);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchAddress();
    }
  }, [latitude]);

  return address;
}

export default addressGetter;
