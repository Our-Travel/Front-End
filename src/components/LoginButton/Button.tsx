import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface buttonInfo {
  name: string;
  page: boolean;
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ name, page, active, onClick }: buttonInfo) {
  return (
    <button type="submit" className={page || active ? 'buttonStyle' : 'noActiveButton'} onClick={onClick} disabled={page ? active : !active}>
      {name}
    </button>
  );
}

export function LoginKakao() {
  const KAKAO_AUTH_URL = 'https://ourtravel.site/api/dev/oauth2/authorization/kakao';
  return (
    <div className="buttonStyle">
      <Link to={KAKAO_AUTH_URL}>
        <img src="/assets/kakaoLogin.svg" alt="카카오계정으로 로그인" />
      </Link>
    </div>
  );
}
