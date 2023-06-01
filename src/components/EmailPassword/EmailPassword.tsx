import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useInput from '../../hooks/useInput';
import { MdOutlineCancel } from 'react-icons/md';

interface inputEmail {
  page: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setEmailState: Dispatch<SetStateAction<boolean>>;
  setEmailStatus: Dispatch<SetStateAction<number>>;
}

export const Email = ({ page, setEmail, setEmailState, setEmailStatus }: inputEmail) => {
  const [success, setSuccess] = useState<number>(0);
  const [fail, setFail] = useState<number>(0);
  const [emailMsg, setEmailMsg] = useState<string>('');
  const email = useInput();

  const emailCheck = async () => {
    try {
      const url = `http://localhost:8080/api/member/check-username/${email.data}`;
      const response: AxiosResponse = await axios.get(url);
      if (response.status === 200) setSuccess(response.status), setEmailStatus(response.status);
      alert(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setFail(error.response.status);
        alert(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    setEmail(email.data);
    email.data && !email.state ? setEmailMsg('형식에 알맞는 이메일을 입력해주세요.') : (setEmailMsg(''), setEmailState(email.state));
  }, [email.data]);

  const SuccessFail = () => {
    return success === 200 ? 'text-green-600 border-green-600' : fail === 400 ? 'text-check-red border-check-red' : email.state ? 'text-gray-600 border-gray-600' : 'text-gray-400 border-gray-300';
  };

  const inputColor = () => {
    return email.data.length === 0 || email.state ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red';
  };

  return (
    <div className="relative inputForm">
      <label htmlFor="userEmail" className="text-left text-gray-500">
        이메일
      </label>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <input required type="email" name="userEmail" id="userEmail" placeholder="abc@email.com" className={page ? `${inputColor()} + inputStyle` : `${inputColor()} + signUpInput`} onChange={email.onChange} value={email.data} />
          {page && email.data ? <MdOutlineCancel className="absolute right-5 w-6 h-6 text-gray-600 cursor-pointer" onClick={email.onReset} /> : null}
        </div>
        {!page ? (
          <button type="button" className={`w-24 h-12 border rounded ${SuccessFail()}`} onClick={emailCheck} disabled={email.state ? false : true}>
            중복확인
          </button>
        ) : null}
      </div>
      <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText'}>{emailMsg}</span>
    </div>
  );
};

interface inputPW {
  page: boolean;
  setPassword: Dispatch<SetStateAction<string>>;
  setPWState: Dispatch<SetStateAction<boolean>>;
}

export const Password = ({ page, setPassword, setPWState }: inputPW) => {
  const [passWordMsg, setpassWordMsg] = useState<string>('');
  const password = useInput();

  useEffect(() => {
    setPassword(password.data);
    password.data && !password.state ? setpassWordMsg('형식에 알맞는 비밀번호를 입력해주세요.') : (setpassWordMsg(''), setPWState(password.state));
  }, [password.data]);

  const inputColor = () => {
    return password.data.length === 0 || password.state ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red';
  };

  return (
    <>
      <label htmlFor="userPw1" className="text-left text-gray-500">
        비밀번호
      </label>
      <div className="flex flex-row items-center">
        <input required type="password" name="userPw1" id="userPw1" placeholder="영문, 숫자, 특수문자 포함 8~16자" className={`${inputColor()} + inputStyle`} onChange={password.onChange} value={password.data} />
        {page && password.data ? <MdOutlineCancel className="absolute right-5 w-6 h-6 text-gray-700 cursor-pointer" onClick={password.onReset} /> : null}
      </div>
      <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText'}>{passWordMsg}</span>
    </>
  );
};
