import { Link, useNavigate } from 'react-router-dom';

interface buttonInfo {
  name: string;
  page: boolean;
  active: boolean;
  success: number;
  // Test용
  click: (() => Promise<void>) | any;
}

export function LoginButton({ name, page, active, success, click }: buttonInfo) {
  const navigate = useNavigate();

  const clickMove = () => {
    if (page || (name === '가입하기' && active && success === 200)) {
      navigate('/signin');
    } else if (name === '로그인' && active) {
      navigate('/main');
    }
  };

  return (
    <button type="submit" className={page || active ? 'buttonStyle' : 'noActiveButton'} onClick={clickMove} disabled={page ? active : !active}>
      {name}
    </button>
  );
}

export function LoginKakao() {
  const KAKAO_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:8080/oauth2/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}`;

  return (
    <div className="buttonStyle">
      <Link to={KAKAO_AUTH_URL}>
        <img src="/assets/kakaoLogin.svg" alt="카카오계정으로 로그인" />
      </Link>
    </div>
  );
}
