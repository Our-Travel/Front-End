import React, { useEffect } from 'react';
import { useParams } from 'react-router';

function KakaoRedirect() {
  const params = useParams();

  useEffect(() => {
    localStorage.clear();
    const token = params.token || ''; // 'undefined'를 빈 문자열로 대체
    localStorage.setItem('token', token);
    window.location.replace('/main');
  }, []);

  return <></>;
}

export default KakaoRedirect;
