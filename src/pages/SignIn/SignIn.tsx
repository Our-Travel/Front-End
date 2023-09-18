import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { Button, LoginGoogle, LoginKakao, LoginNaver } from '../../components/LoginButton/Button';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import React, { useEffect, useState, MouseEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { token } from '../../Atom/atom';
import { userInfo } from '../../Atom/userAtom';

const SignIn = () => {
  const [pwData, setPwData] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const setToken = useSetRecoilState(token);
  const user = useRecoilValue(userInfo);
  const resetInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const login = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/login`;
      const response = await axios.post(url, {
        username: user.email?.data,
        password: user.password?.data,
      });
      setToken(response.headers.authentication);
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
    user.email?.state && user.password?.state ? setActive(true) : setActive(false);
  }, [user.email?.state, user.password?.state]);

  return (
    <>
      <Header title={'로그인'} back={true} icon={''} />
      <div className="w-52 h-52 mx-auto my-10">
        <Logo />
      </div>
      <form className="flex flex-col justify-center items-center gap-6">
        <Email page={true} id={'email'} title={'이메일'} type={'email'} placeholder={'abc@email.com'} />
        <div className="relative inputForm">
          <Password page={true} setPwData={setPwData} />
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
