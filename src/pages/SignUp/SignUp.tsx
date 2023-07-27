import React, { useEffect, useState, MouseEvent } from 'react';
import Header from '../../components/Header/Header';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { LoginButton } from '../../components/LoginButton/LoginButton';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, signUpStatus } from '../../Atom/userAtom';

const SignUp = () => {
  const [pwData, setPwData] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const user = useRecoilValue(userInfo);
  const status = useRecoilValue(signUpStatus);
  const resetStatus = useSetRecoilState(signUpStatus);
  const navigate = useNavigate();

  const join = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/api/members/signup`;
      const response = await axios.post(url, {
        username: user.email?.data,
        password: user.password?.data,
        nick_name: user.nickName?.data,
      });
      resetStatus({ email: null, nickName: null });
      alert(response.data.msg);
      navigate('/signin');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data.msg);
      } else {
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  useEffect(() => {
    user.password?.data === pwData && status.email === 200 && status.nickName === 200 ? setActive(true) : setActive(false);
  }, [pwData, status.email, status.nickName]);

  return (
    <>
      <Header title={'회원가입'} back={true} icon={''} />
      <form className="w-[25rem] mx-auto mt-6">
        <div className="flex flex-col gap-4">
          <Email page={false} id={'email'} title={'이메일'} type={'email'} placeholder={'abc@email.com'} />
          <div className="relative inputForm">
            <Password page={false} setPwData={setPwData} />
          </div>
          <Email page={false} id={'nickName'} title={'닉네임'} type={'text'} placeholder={'한글, 영문, 숫자 가능 3~8자'} />
        </div>
        <div className="absolute bottom-7">
          <LoginButton name={'가입하기'} page={false} active={active} onClick={join} />
        </div>
      </form>
    </>
  );
};

export default SignUp;
