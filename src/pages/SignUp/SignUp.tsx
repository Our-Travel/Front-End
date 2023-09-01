import React, { useEffect, useState, MouseEvent } from 'react';
import Header from '../../components/Header/Header';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { Button } from '../../components/LoginButton/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';
import useCheck from '../../hooks/useCheck';

const SignUp = () => {
  const [active, setActive] = useState<boolean>(false);
  const { status, nickNameCheck } = useCheck();
  const email = useInput();
  const nickName = useInput();
  const password = useInput();
  const pwCheck = useInput();
  const navigate = useNavigate();

  const join = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/signup`;
      const response = await axios.post(url, {
        username: email.data,
        password: password.data,
        nick_name: nickName.data,
      });
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

  const handleNickName = () => {
    nickNameCheck('nickName', nickName.data);
  };

  const nickNameBtn = () => {
    return status === 200 ? 'text-green-600 border-green-600' : status === 400 ? 'text-check-red border-check-red' : 'text-gray-500 border-gray-400';
  };

  const nickNameInput = () => {
    return !nickName.data.length || nickName.state ? 'border-gray-400' : 'border-check-red outline-check-red';
  };

  const passwordInput = () => {
    return !pwCheck.data.length || password.data === pwCheck.data ? 'border-gray-400' : 'border-check-red outline-check-red';
  };

  useEffect(() => {
    password.data === pwCheck.data && status === 200 ? setActive(true) : setActive(false);
  }, [password.data, pwCheck.data, status]);

  return (
    <>
      <Header title={'회원가입'} back={true} icon={''} />
      <form className="w-[25rem] mx-auto mt-6">
        <div className="flex flex-col gap-4">
          <Email page={false} data={email.data} state={email.state} onChange={email.onChange} onReset={email.onReset} />
          <div className="inputForm">
            <Password page={false} data={password.data} state={password.state} onChange={password.onChange} onReset={password.onReset} />
          </div>
          <div className="inputForm">
            <label htmlFor="userPw2" className="text-left text-gray-500">
              비밀번호 재확인
            </label>
            <input required type="password" name="userPw2" id="userPw2" placeholder="영문, 숫자, 특수문자 포함 8~16자" className={`inputStyle ${passwordInput()}`} onChange={pwCheck.onChange} />
            <span className="errorText">{pwCheck.data.length && password.data !== pwCheck.data ? '비밀번호가 일치 하지 않습니다.' : null}</span>
          </div>
          <div className="inputForm">
            <label htmlFor={'nickName'} className="text-left text-gray-600">
              닉네임
            </label>
            <div className="flex justify-between">
              <input required type="text" name="nickName" id="nickName" placeholder="한글, 영문, 숫자 가능 3~8자" className={`shortInput ${nickNameInput()}`} onChange={nickName.onChange} value={nickName.data} />
              <button type="button" className={`w-24 h-12 border rounded ${nickNameBtn()}`} onClick={handleNickName} disabled={!nickName.state}>
                중복확인
              </button>
            </div>
            <span className="errorText">{nickName.data && !nickName.state && '올바른 닉네임을 입력해주세요. (공백 불가)'}</span>
          </div>
        </div>
        <div className="absolute bottom-7">
          <Button name={'가입하기'} page={false} active={active} onClick={join} />
        </div>
      </form>
    </>
  );
};

export default SignUp;
