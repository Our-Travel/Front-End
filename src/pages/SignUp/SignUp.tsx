import Header from '../../components/Header/Header';
import { Email, Password } from '../../components/EmailPassword/EmailPassword';
import { LoginButton } from '../../components/LoginButton/LoginButton';
import Select from 'react-select';

const test = [
  { value: '전체', label: '전체' },
  { value: '테스트', label: '테스트' },
  { value: '테스트', label: '테스트' },
  { value: '테스트', label: '테스트' },
  { value: '테스트', label: '테스트' },
];

export default function SignUp() {
  return (
    <>
      <Header title={'회원가입'} />
      <form>
        <div className="flex flex-col gap-4 w-[25rem] mx-auto mt-6">
          <Email title={'이메일'} id={'userEmail'} type={'email'} page={false} text={'abc@email.com'} />
          <Password title={'비밀번호'} id={'userPw1'} />
          <Password title={'비밀번호 재확인'} id={'userPw2'} />
          <Email title={'닉네임'} id={'userNickName'} type={'text'} page={false} text={'한글 또는 영문 6자 이하'} />
          <div className="inputForm">
            <label htmlFor="userAddress" className="text-left text-gray-500">
              주소
            </label>
            <div className="flex flex-row gap-4">
              <Select className="signUpAddress" maxMenuHeight={160} options={test} placeholder="시 / 도" />
              <Select className="signUpAddress" maxMenuHeight={160} options={test} placeholder="시 / 군 / 구" />
            </div>
          </div>
          <div className="absolute bottom-7">
            <LoginButton name={'가입하기'} page={false} />
          </div>
        </div>
      </form>
    </>
  );
}
