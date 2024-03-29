import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { BsGoogle } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

interface buttonInfo {
  name: string;
  page: boolean;
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ name, page, active, onClick }: buttonInfo) {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  return (
    <button type="submit" className={`w-full ${page || active ? 'buttonStyle buttonHoverColor' : 'noActiveButton'}`} onClick={onClick} disabled={page ? active : !active}>
      {m(name)}
    </button>
  );
}

export function LoginKakao() {
  const KAKAO_AUTH_URL = `${process.env.REACT_APP_KAKAO_AUTH_URL}`;
  return (
    <div className="circleButtonStyle bg-yellow-300 cursor-pointer" onClick={() => window.open(KAKAO_AUTH_URL, '_blank')}>
      {/* <Link to={KAKAO_AUTH_URL} className="w-full h-full "> */}
      <RiKakaoTalkFill className="w-full h-full p-2" />
      {/* </Link> */}
    </div>
  );
}

export function LoginGoogle() {
  const GOOGLE_AUTH_URL = `${process.env.REACT_APP_GOOGLE_AUTH_URL}`;
  return (
    <div className="circleButtonStyle bg-white border-2 border-google-color cursor-pointer" onClick={() => window.open(GOOGLE_AUTH_URL, '_blank')}>
      {/* <Link to={GOOGLE_AUTH_URL} className="w-full h-full "> */}
      <BsGoogle className="w-full h-full p-2" />
      {/* </Link> */}
    </div>
  );
}
