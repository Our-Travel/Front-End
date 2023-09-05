import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { Button, LoginKakao } from '../../components/LoginButton/Button';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import React, { useEffect, useState, MouseEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';

const SignIn = () => {
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();

  const login = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/login`;
      const response = await axios.post(url, {
        username: email.data,
        password: password.data,
      });
      localStorage.setItem('token', response.headers.authentication);
      alert(response.data.msg);
      navigate('/main');
    } catch (error) {
      navigate('/signin');
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data.msg);
      } else {
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  useEffect(() => {
    email.state && password.state ? setActive(true) : setActive(false);
  }, [email.state, password.state]);

  return (
    <>
      <Header title={'로그인'} back={true} icon={''} />
      <div className="w-52 h-52 mx-auto my-10">
        <Logo />
      </div>
      <form className="flex flex-col justify-center items-center gap-6">
        <Email page={true} data={email.data} state={email.state} onChange={email.onChange} onReset={email.onReset} />
        <div className="relative inputForm">
          <Password page={true} data={password.data} state={password.state} onChange={password.onChange} onReset={password.onReset} />
        </div>
        <Button name={'로그인'} page={false} active={active} onClick={login} />
        <LoginKakao />
      </form>
      <ChoiceTab />
    </>
  );
};

export default SignIn;
