import { loginType } from 'Atom/userAtom';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSetRecoilState } from 'recoil';
import jwtDecode, { JwtPayload } from 'jwt-decode';

interface DecodedToken {
  id: number;
  username: string;
  nickName: string;
  authorities: { authority: string }[];
  exp: number;
}
interface Token {
  body: string;
}

function GoogleRedirect() {
  const params = useParams();
  const signType = useSetRecoilState(loginType);

  useEffect(() => {
    const token = params.token; // 'undefined'를 빈 문자열로 대체
    if (token) {
      localStorage.clear();
      const decoded = jwtDecode<Token>(token);
      const parsedBody: DecodedToken = JSON.parse(decoded.body);

      localStorage.setItem('token', token);
      localStorage.setItem('nickname', parsedBody.nickName);
      localStorage.setItem('memberId', String(parsedBody.id));

      signType(false);
      window.location.replace('/main');
    }
  }, []);

  return <></>;
}

export default GoogleRedirect;
