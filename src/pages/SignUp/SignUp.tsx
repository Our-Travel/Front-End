import React, { useEffect, useState, MouseEvent } from 'react';
import Header from '../../components/Header/Header';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { Button } from '../../components/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { langConvert } from 'Atom/atom';
import { useRecoilValue } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';

const SignUp = () => {
  const [active, setActive] = useState<boolean>(false);
  const { status, signupCheck } = useFetch();
  const email = useInput();
  const nickName = useInput();
  const password = useInput();
  const pwCheck = useInput();
  const navigate = useNavigate();
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

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
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  const handleNickName = () => signupCheck('nickName', nickName.data);
  const nickNameBtn = () => (status === 200 ? 'text-green-600 border-green-600' : status === 400 ? 'text-check-red border-check-red' : nickName.state ? 'text-black border-black' : 'text-gray-500 border-gray-400');
  const nickNameInput = () => (!nickName.data.length || nickName.state ? 'border-gray-400' : 'border-check-red outline-check-red');
  const passwordInput = () => (!pwCheck.data.length || password.data === pwCheck.data ? 'border-gray-400' : 'border-check-red outline-check-red');

  useEffect(() => {
    password.data && password.data === pwCheck.data && status === 200 ? setActive(true) : setActive(false);
  }, [password.data, pwCheck.data, status]);

  return (
    <>
      <Header title={'SIGN_UP'} back={true} icon={''} />
      <form className="w-full px-4 mt-6">
        <div className="flex flex-col gap-4">
          <Email page={false} title={m('EMAIL')} data={email.data} state={email.state} onChange={email.onChange} onReset={email.onReset} />
          <div className="inputForm">
            <Password page={false} title={m('PASSWORD')} data={password.data} state={password.state} onChange={password.onChange} onReset={password.onReset} />
          </div>
          <div className="inputForm">
            <label htmlFor="userPw2" className="text-left text-gray-500">
              {m('RECONFIRM_PASSWORD')}
            </label>
            <input required type="password" name="userPw2" id="userPw2" placeholder={m('PLACEHOLDER_PASSWORD')} className={`inputStyle text-sm ${passwordInput()}`} onChange={pwCheck.onChange} />
            <span className="errorText">{pwCheck.data.length && password.data !== pwCheck.data ? '비밀번호가 일치 하지 않습니다.' : null}</span>
          </div>
          <div className="inputForm">
            <label htmlFor={'nickName'} className="text-left text-gray-500">
              {m('NICKNAME')}
            </label>
            <div className="flex justify-between">
              <input required type="text" name="nickName" id="nickName" placeholder={m('PLACEHOLDER_NICKNAME')} className={`inputStyle text-sm ${nickNameInput()}`} onChange={nickName.onChange} value={nickName.data} />
              <button type="button" className={`w-28 h-12 ml-7 border rounded ${nickNameBtn()}`} onClick={handleNickName} disabled={!nickName.state}>
                {m('DOUBLE_CHECK')}
              </button>
            </div>
            <span className="errorText">{nickName.data && !nickName.state && '올바른 닉네임을 입력해주세요. (공백 불가)'}</span>
          </div>
        </div>
      </form>
      <div className="absolute w-full px-4 bottom-7">
        <Button name={'가입하기'} page={false} active={active} onClick={join} />
      </div>
    </>
  );
};

export default SignUp;
