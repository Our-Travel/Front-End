import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { LoginButton, LoginKakao } from '../../components/LoginButton/LoginButton';
import ChoiceTab from '../../components/ChoiceTab/ChoiceTab';

export default function SignIn() {
  return (
    <>
      <Header title={'로그인'} showButton={true} />
      <div className="w-52 h-52 mx-auto my-10">
        <Logo />
      </div>
      <form className="flex flex-col justify-center items-center gap-5">
        <Email title={'이메일'} id={'userEmail'} type={'email'} page={true} text={'abc@email.com'} />
        <Password title={'비밀번호'} id={'userPw1'} />
        <LoginButton name={'로그인'} page={false} />
        <LoginKakao />
      </form>
      <ChoiceTab />
    </>
  );
}
