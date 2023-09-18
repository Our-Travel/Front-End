import Header from 'components/Header/Header';
import { Password } from 'components/EmailPassword/EmailPassword';
import { Button } from 'components/LoginButton/Button';
import useInput from '../../hooks/useInput';
import { useEffect, useState, MouseEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileCheck = () => {
  const [active, setActive] = useState<boolean>(false);
  const password = useInput();
  const navigate = useNavigate();

  const check = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/validate-password`;
      const response = await axios.post(
        url,
        {
          password: password.data,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(response.data.msg);
      navigate('/mypage/profileEdit');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  useEffect(() => {
    password.state ? setActive(true) : setActive(false);
  }, [password.state]);

  return (
    <form className="absolute flex flex-col gap-4 top-[40%] left-1/2 -translate-x-[50%]">
      <div className="inputForm">
        <Password page={true} title={'현재 비밀번호 확인'} data={password.data} state={password.state} onChange={password.onChange} onReset={password.onReset} />
      </div>
      <Button name={'확인하기'} page={false} active={active} onClick={check} />
    </form>
  );
};

export default ProfileCheck;
