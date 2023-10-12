import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { Button, LoginGoogle, LoginKakao, LoginNaver } from '../../components/LoginButton/Button';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import React, { useEffect, useState, MouseEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';
import { useSetRecoilState } from 'recoil';
import { loginType } from 'Atom/userAtom';

const SignIn = () => {
  const [active, setActive] = useState<boolean>(false);
  const signType = useSetRecoilState(loginType);
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
      signType(true);
      alert(response.data.msg);
      navigate('/main');
    } catch (error) {
      navigate('/signin');
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
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
        <Email page={true} title={'이메일'} data={email.data} state={email.state} onChange={email.onChange} onReset={email.onReset} />
        <div className="relative inputForm">
          <Password page={true} title={'비밀번호'} data={password.data} state={password.state} onChange={password.onChange} onReset={password.onReset} />
        </div>
        <Button name={'로그인'} page={false} active={active} onClick={login} />
        <div className="text-center">
          <div className="flex items-center">
            <div className="flex-grow border-b"></div>
            <div className="px-2 text-gray-500 text-xs">Social Login</div>
            <div className="flex-grow border-b"></div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-8">
          <LoginKakao />
          <LoginNaver />
          <LoginGoogle />
        </div>
      </form>
      <ChoiceTab />
    </>
  );
};

export default SignIn;
