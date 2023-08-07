import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface buttonInfo {
  name: string;
  page: boolean;
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function LoginButton({ name, page, active, onClick }: buttonInfo) {
  return (
    <button type="submit" className={page || active ? 'buttonStyle' : 'noActiveButton'} onClick={onClick} disabled={page ? active : !active}>
      {name}
    </button>
  );
}

export function LoginKakao() {
  const KAKAO_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:3000/kakao/redirect';
  // const REDIRECT_URI = `${process.env.REACT_APP_REST_API_SERVER}/login/oauth2/code/kakao`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="buttonStyle">
      <Link to={KAKAO_AUTH_URL}>
        <img src="/assets/kakaoLogin.svg" alt="카카오계정으로 로그인" />
      </Link>
    </div>
  );
}
