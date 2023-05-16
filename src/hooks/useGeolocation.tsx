import React, { useState, useEffect } from 'react';

interface locationTyepd {
  loaded: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<locationTyepd>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  // 현재 위치성공
  const onSuccess = (location: { coords: { latitude: number; longitude: number } }) => {
    setLocation({
      loaded: true,
      coordinates: { lat: location.coords.latitude, lng: location.coords.longitude },
    });
  };
  // 위치 실패
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: false,
      error,
    });
  };
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: '위치정보를 불러오지 못했습니다.',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
