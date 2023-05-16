import { Link } from 'react-router-dom';

interface buttonInfo {
  name: string;
  page: boolean;
}

export function LoginButton({ name, page }: buttonInfo) {
  // 나중에 Link 태그 지워야함
  return (
    <Link to="/signin">
      <button type="button" className={page ? 'buttonStyle' : 'noActiveButton'}>
        {name}
      </button>
    </Link>
  );
}

export function LoginKakao() {
  return (
    <Link to="/signin">
      <button type="button" className="buttonStyle">
        <img src="/assets/kakaoLogin.svg" alt="카카오계정으로 로그인" />
      </button>
    </Link>
  );
}
