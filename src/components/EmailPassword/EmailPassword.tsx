import React, { ChangeEvent } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import useCheck from 'hooks/useCheck';

interface userInfo {
  page: boolean;
  data: string;
  state: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export const Email = ({ page, data, state, onChange, onReset }: userInfo) => {
  const { status, signupCheck } = useCheck();

  const handleEmail = () => signupCheck('username', data);
  const emailBtn = () => (status === 200 ? 'text-green-600 border-green-600' : status === 400 ? 'text-check-red border-check-red' : 'text-gray-500 border-gray-400');
  const emailInput = () => (!data.length || state ? 'border-gray-400' : 'border-check-red outline-check-red');

  return (
    <>
      <div className="relative inputForm">
        <label htmlFor="email" className="text-left text-gray-500">
          이메일
        </label>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <input required type="email" id="email" placeholder="email@email.com" className={page ? `${emailInput()} inputStyle` : `${emailInput()} shortInput`} onChange={onChange} value={data} />
            {page && data && <MdOutlineCancel className="absolute right-5 w-6 h-6 text-gray-600 cursor-pointer" onClick={onReset} />}
          </div>
          {page || (
            <button type="button" className={`w-24 h-12 border rounded ${emailBtn()}`} onClick={handleEmail} disabled={!state}>
              중복확인
            </button>
          )}
        </div>
        <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText'}>{data && !state ? '형식에 알맞는 이메일을 입력해주세요.' : null}</span>
      </div>
    </>
  );
};

export const Password = ({ page, data, state, onChange, onReset }: userInfo) => {
  return (
    <>
      <label htmlFor="userPw1" className="text-left text-gray-500">
        비밀번호
      </label>
      <div className="flex flex-row items-center">
        <input
          required
          type="password"
          name="userPw1"
          id="userPw1"
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          className={`${!data.length || state ? 'border-gray-400' : 'border-check-red outline-check-red'} inputStyle`}
          onChange={onChange}
          value={data}
        />
        {page && data ? <MdOutlineCancel className="absolute right-5 w-6 h-6 text-gray-700 cursor-pointer" onClick={onReset} /> : null}
      </div>
      <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText'}>{data && !state ? '형식에 알맞는 비밀번호를 입력해주세요.' : null}</span>
    </>
  );
};
