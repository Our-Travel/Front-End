import { loginType } from 'Atom/userAtom';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSetRecoilState } from 'recoil';

function KakaoRedirect() {
  const params = useParams();
  const signType = useSetRecoilState(loginType);

  useEffect(() => {
    localStorage.clear();
    const token = params.token || ''; // 'undefined'를 빈 문자열로 대체
    localStorage.setItem('token', token);
    signType(false);
    window.location.replace('/main');
  }, []);

  return <></>;
}

export default KakaoRedirect;
