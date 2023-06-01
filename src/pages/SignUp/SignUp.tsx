import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { LoginButton } from '../../components/LoginButton/LoginButton';
import useInput from '../../hooks/useInput';
import axios, { AxiosResponse } from 'axios';

interface optionType {
  value: string;
  label: string;
}

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passWordCheck, setPassWordCheck] = useState<string>('');
  const [nickNameMsg, setNickNameMsg] = useState<string>('');
  const [success, setSuccess] = useState<number>(0);
  const [fail, setFail] = useState<number>(0);
  const [emailstate, setEmailState] = useState<boolean>(false);
  const [PWstate, setPWState] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<number>(0);
  const pwCheck = useInput();
  const nickName = useInput();

  const join = async () => {
    try {
      const url = `http://localhost:8080/api/member/signup`;
      const response: AxiosResponse = await axios.post(url, {
        username: email,
        password: password,
        nickName: nickName.data,
      });
      alert(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    pwCheck.data.length > 0 && password !== pwCheck.data ? setPassWordCheck('비밀번호가 일치 하지 않습니다.') : setPassWordCheck('');
  }, [pwCheck.data, password]);

  const nickNameCheck = async () => {
    try {
      const url = `http://localhost:8080/api/member/check-nickName/${nickName.data}`;
      const response: AxiosResponse = await axios.get(url);
      if (response.status === 200) setSuccess(response.status);
      alert(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setFail(error.response.status);
        alert(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    nickName.data && !nickName.state ? setNickNameMsg('올바른 닉네임을 입력해주세요. (공백 불가)') : setNickNameMsg('');
  }, [nickName.data]);

  const SuccessFail = () => {
    return success === 200 ? 'text-green-500 border-green-500' : fail === 400 ? 'text-check-red border-check-red' : nickName.state ? 'text-gray-600 border-gray-600' : 'text-gray-400 border-gray-300';
  };

  useEffect(() => {
    emailstate && PWstate && password === pwCheck.data && nickName.state && success === 200 && emailStatus === 200 ? setActive(true) : setActive(false);
  }, [emailstate, PWstate, pwCheck, nickName, success, emailStatus]);

  return (
    <>
      <Header title={'회원가입'} />
      <form>
        <div className="flex flex-col gap-4 w-[25rem] mx-auto mt-6">
          <Email page={false} setEmail={setEmail} setEmailState={setEmailState} setEmailStatus={setEmailStatus} />
          <div className="relative inputForm">
            <Password page={false} setPassword={setPassword} setPWState={setPWState} />
            <label htmlFor="userPw2" className="mt-4 text-left text-gray-500">
              비밀번호 재확인
            </label>
            <input
              required
              type="password"
              name="userPw2"
              id="userPw2"
              placeholder="영문, 숫자, 특수문자 포함 8~16자"
              className={`${pwCheck.data.length === 0 || password === pwCheck.data ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red'}  + inputStyle`}
              onChange={pwCheck.onChange}
            />
            <span className="errorText">{passWordCheck}</span>
          </div>
          <div className="inputForm">
            <label htmlFor="userNickName" className="text-left text-gray-500">
              닉네임
            </label>
            <div className="flex flex-row justify-between">
              <input
                type="text"
                name="userNickName"
                id="userNickName"
                placeholder="한글, 영문, 숫자 포함 3~8자'"
                className={`${nickName.data.length === 0 || nickName.state ? 'border-gray-300 outline-blue-700' : 'border-check-red outline-check-red'} + signUpInput`}
                onChange={nickName.onChange}
              />
              <button type="button" className={`w-24 h-12 border rounded ${SuccessFail()}`} onClick={nickNameCheck} disabled={nickName.state ? false : true}>
                중복확인
              </button>
            </div>
            <span className="errorText">{nickNameMsg}</span>
          </div>
          <div className="absolute bottom-7" onClick={join}>
            <LoginButton name={'가입하기'} page={false} active={active} success={success} click={join} />
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
