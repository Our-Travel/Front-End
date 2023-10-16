import React, { useEffect, useState } from 'react';
import useGeolocation from './useGeolocation';
import axios from 'axios';

function addressGetter() {
  const location = useGeolocation();
  const [address, setAddress] = useState('');
  const latitude = location.coordinates?.lat;
  const longitude = location.coordinates?.lng;

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
          setAddress(formattedAddress);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAddress();
    }
  }, [latitude, longitude]);

  console.log(address);

  return address;
}

export default addressGetter;
