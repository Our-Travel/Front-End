import { useNavigate } from 'react-router-dom';

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
  return (
    <button type="button" className="buttonStyle">
      <img src="/assets/kakaoLogin.svg" alt="카카오계정으로 로그인" />
    </button>
  );
}
