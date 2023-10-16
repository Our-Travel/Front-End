import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { Button, LoginGoogle, LoginKakao } from '../../components/Button/Button';
import ChoiceTab from 'components/SignIn/ChoiceTab';
import React, { useEffect, useState, MouseEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import jwtDecode from 'jwt-decode';
import useInput from 'hooks/useInput';
import { loginType } from 'Atom/userAtom';
import useMultilingual from 'hooks/useMultilingual';
import { langConvert } from 'Atom/atom';

interface DecodedToken {
  id: number;
  username: string;
  nickName: string;
  authorities: { authority: string }[];
  exp: number;
}
interface Token {
  body: string;
}

const SignIn = () => {
  const [active, setActive] = useState<boolean>(false);
  const signType = useSetRecoilState(loginType);
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  const login = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/login`;
      const response = await axios.post(url, {
        username: email.data,
        password: password.data,
      });
      const receivedToken: string = response.headers.authentication;
      const decoded = jwtDecode<Token>(receivedToken);
      const parsedBody: DecodedToken = JSON.parse(decoded.body);
      const nickName = parsedBody.nickName;
      localStorage.setItem('token', response.headers.authentication);
      localStorage.setItem('nickname', nickName);
      localStorage.setItem('memberId', String(parsedBody.id));
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
    <div>
      <Header title={'LOG_IN'} back={true} icon={''} />
      <div className="w-52 h-52 mx-auto my-10">
        <Logo />
      </div>
      <form className="w-full flex flex-col gap-5 px-4">
        <Email page={true} title={m('EMAIL')} data={email.data} state={email.state} onChange={email.onChange} onReset={email.onReset} />
        <div className="relative inputForm">
          <Password page={true} title={m('PASSWORD')} data={password.data} state={password.state} onChange={password.onChange} onReset={password.onReset} />
        </div>
        <div className="mt-7">
          <Button name={'LOG_IN'} page={false} active={active} onClick={login} />
        </div>
      </form>
      <div className="text-center my-7">
        <div className="flex items-center">
          <div className="flex-grow border-b"></div>
          <div className="px-2 text-gray-500 text-xs">{m('SOCIAL_LOGIN')}</div>
          <div className="flex-grow border-b"></div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-8">
        <LoginKakao />
        <LoginGoogle />
      </div>
      <div className="flex flex-row justify-center mx-4">
        <ChoiceTab />
      </div>
    </div>
  );
};

export default SignIn;
