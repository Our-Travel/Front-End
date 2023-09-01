import { Navigate, useNavigate } from 'react-router-dom';

const useLoginCheck = () => {
  const navigate = useNavigate();

  const loginCheck = () => {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      navigate('/signin');
      alert('로그인 후 이용 가능합니다.');
      return false;
    }
  };

  return loginCheck;
};

export default useLoginCheck;
