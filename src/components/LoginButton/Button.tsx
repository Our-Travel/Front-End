import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { BsGoogle } from 'react-icons/bs';

interface buttonInfo {
  name: string;
  page: boolean;
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ name, page, active, onClick }: buttonInfo) {
  return (
    <button type="submit" className={page || active ? 'buttonStyle buttonHoverColor' : 'noActiveButton'} onClick={onClick} disabled={page ? active : !active}>
      {name}
    </button>
  );
}

export function LoginKakao() {
  const KAKAO_AUTH_URL = 'https://ourtravel.site/api/dev/oauth2/authorization/kakao';
  return (
    <div className="circleButtonStyle bg-yellow-300">
      <Link to={KAKAO_AUTH_URL} className="w-full h-full ">
        <RiKakaoTalkFill className="w-full h-full p-2" />
      </Link>
    </div>
  );
}

export function LoginGoogle() {
  const KAKAO_AUTH_URL = 'https://ourtravel.site/api/dev/oauth2/authorization/google';
  return (
    <div className="circleButtonStyle bg-white border-2 border-google-color">
      <Link to={KAKAO_AUTH_URL} className="w-full h-full ">
        <BsGoogle className="w-full h-full p-2" />
      </Link>
    </div>
  );
}
