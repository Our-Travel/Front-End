import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { LoginButton, LoginKakao } from '../../components/LoginButton/LoginButton';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import React, { useEffect, useState, MouseEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { token } from '../../recoil/loginAtom';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [emailstate, setEmailState] = useState<boolean>(false);
  const [PWstate, setPWState] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<number>(0);
  const navigate = useNavigate();
  const setToken = useSetRecoilState(token);

  const login = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/members/login';
      const response: AxiosResponse = await axios.post(url, {
        username: email,
        password: password,
      });
      setToken(response.data.data.access_token);
      localStorage.setItem('token', response.data.data.access_token);
      navigate('/main');
      alert('✅ 환영합니다. 좋은하루 되세요. ✅');
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
    email && password && emailstate && PWstate ? setActive(true) : setActive(false);
  }, [email, password, emailstate, PWstate]);

  return (
    <>
      <Header title={'로그인'} back={true} icon={''} />
      <div className="w-52 h-52 mx-auto my-10">
        <Logo />
      </div>
      <form className="flex flex-col justify-center items-center gap-6">
        <Email page={true} setEmail={setEmail} setEmailState={setEmailState} setEmailStatus={setEmailStatus} />
        <div className="relative inputForm">
          <Password page={true} setPassword={setPassword} setPWState={setPWState} />
        </div>
        <LoginButton name={'로그인'} page={false} active={active} onClick={login} />
        <LoginKakao />
      </form>
      <ChoiceTab />
    </>
  );
};

export default SignIn;
