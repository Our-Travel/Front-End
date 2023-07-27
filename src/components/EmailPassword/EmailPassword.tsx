import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useInput from '../../hooks/useInput';
import { MdOutlineCancel } from 'react-icons/md';
import { userInfo, signUpStatus } from '../../Atom/userAtom';
import { useRecoilState } from 'recoil';

interface inputEmail {
  page: boolean;
  id: string;
  title: string;
  type: string;
  placeholder: string;
}

export const Email = ({ page, id, title, type, placeholder }: inputEmail) => {
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [nickNameMsg, setNickNameMsg] = useState<string>('');
  const [info, setInfo] = useRecoilState(userInfo);
  const [status, setStatus] = useRecoilState(signUpStatus);
  const email = useInput();
  const nickName = useInput();

  const emailCheck = async () => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/exists/username/${email.data}`;
      const response = await axios.get(url);
      if (response.status === 200) setStatus({ ...status, email: response.status });
      alert(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setStatus({ ...status, email: error.response.status });
        alert(error.response.data.msg);
      } else {
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  const nickNameCheck = async () => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/exists/nickName/${nickName.data}`;
      const response = await axios.get(url);
      if (response.status === 200) setStatus({ ...status, nickName: response.status });
      alert(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setStatus({ ...status, nickName: error.response.status });
        alert(error.response.data.msg);
      } else {
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  useEffect(() => {
    if (type === 'email') {
      setInfo({ ...info, email: { data: email.data, state: email.state } });
    } else {
      setInfo({ ...info, nickName: { data: nickName.data, state: nickName.state } });
    }
  }, [email.data, nickName.data]);

  useEffect(() => {
    email.data && !email.state ? setEmailMsg('형식에 알맞는 이메일을 입력해주세요.') : setEmailMsg('');
    nickName.data && !nickName.state ? setNickNameMsg('올바른 닉네임을 입력해주세요. (공백 불가)') : setNickNameMsg('');
  }, [email.data, nickName.data]);

  const SuccessFail = () => {
    if (id === 'email') {
      return status.email === 200 ? 'text-green-600 border-green-600' : status.email === 400 ? 'text-check-red border-check-red' : email.state ? 'text-gray-600 border-gray-600' : 'text-gray-400 border-gray-300';
    }
    if (id === 'nickName') {
      return status.nickName === 200 ? 'text-green-600 border-green-600' : status.nickName === 400 ? 'text-check-red border-check-red' : nickName.state ? 'text-gray-600 border-gray-600' : 'text-gray-400 border-gray-300';
    }
  };

  const inputColor = () => {
    if (id === 'email') {
      return !email.data.length || email.state ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red';
    } else {
      return !nickName?.data.length || nickName.state ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red';
    }
  };

  return (
    <>
      <div className="relative inputForm">
        <label htmlFor={id} className="text-left text-gray-500">
          {title}
        </label>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <input
              required
              type={type}
              name={id}
              id={id}
              placeholder={placeholder}
              className={page ? `${inputColor()} + inputStyle` : `${inputColor()} + signUpInput`}
              onChange={type === 'email' ? email.onChange : nickName.onChange}
              value={type === 'email' ? email.data : nickName.data}
            />
            {page && email.data ? <MdOutlineCancel className="absolute right-5 w-6 h-6 text-gray-600 cursor-pointer" onClick={email.onReset} /> : null}
          </div>
          {page || (
            <button type="button" className={`w-24 h-12 border rounded ${SuccessFail()}`} onClick={() => (type === 'email' ? emailCheck() : nickNameCheck())} disabled={email.state || nickName.state ? false : true}>
              중복확인
            </button>
          )}
        </div>
        <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText'}>{type === 'email' ? emailMsg : nickNameMsg}</span>
      </div>
    </>
  );
};

interface inputPW {
  page: boolean;
  setPwData: Dispatch<SetStateAction<string>>;
}

export const Password = ({ page, setPwData }: inputPW) => {
  const [passWordMsg, setPassWordMsg] = useState<string>('');
  const [passWordCheck, setPwCheckMsg] = useState<string>('');
  const [info, setInfo] = useRecoilState(userInfo);
  const password = useInput();
  const pwCheck = useInput();

  useEffect(() => {
    setInfo({ ...info, password: { data: password.data, state: password.state } });
  }, [password.data]);

  useEffect(() => {
    setPwData(pwCheck.data);
    password.data && !password.state ? setPassWordMsg('형식에 알맞는 비밀번호를 입력해주세요.') : setPassWordMsg('');
    pwCheck.data.length > 0 && password.data !== pwCheck.data ? setPwCheckMsg('비밀번호가 일치 하지 않습니다.') : setPwCheckMsg('');
  }, [password.data, pwCheck.data]);

  const inputColor = () => {
    return !password.data.length || password.state ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red';
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
      <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText mb-4'}>{passWordMsg}</span>
      {page || (
        <>
          <label htmlFor="userPw2" className="text-left text-gray-500">
            비밀번호 재확인
          </label>
          <input
            required
            type="password"
            name="userPw2"
            id="userPw2"
            placeholder="영문, 숫자, 특수문자 포함 8~16자"
            className={`${!pwCheck.data.length || password.data === pwCheck.data ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red'}  + inputStyle`}
            onChange={pwCheck.onChange}
          />
          <span className="errorText">{passWordCheck}</span>
        </>
      )}
    </>
  );
};
