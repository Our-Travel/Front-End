import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { LoginButton, LoginKakao } from '../../components/LoginButton/LoginButton';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [emailstate, setEmailState] = useState<boolean>(false);
  const [PWstate, setPWState] = useState<boolean>(false);
  const [success, setSuccess] = useState<number>(0);
  const [emailStatus, setEmailStatus] = useState<number>(0);

  const login = async () => {
    try {
      const url = `http://49.50.162.22:80/api/member/login`;
      const response = await axios.post(url, {
        username: email,
        password: password,
      });
      alert(response.data.msg);
      setSuccess(response.status);
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    emailstate && PWstate ? setActive(true) : setActive(false);
  }, [emailstate, PWstate]);

  return (
    <>
      <Header title={'로그인'} />
      <div className="w-52 h-52 mx-auto my-10">
        <Logo />
      </div>
      <form className="flex flex-col justify-center items-center gap-6">
        <Email page={true} setEmail={setEmail} setEmailState={setEmailState} setEmailStatus={setEmailStatus} />
        <div className="relative inputForm">
          <Password page={true} setPassword={setPassword} setPWState={setPWState} />
        </div>
        <div onClick={login}>
          <LoginButton name={'로그인'} page={false} active={active} success={success} click={login} />
        </div>
        <LoginKakao />
      </form>
      <ChoiceTab />
    </>
  );
};

export default SignIn;
