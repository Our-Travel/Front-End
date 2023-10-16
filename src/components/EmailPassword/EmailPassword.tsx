import React, { ChangeEvent } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import useFetch from 'hooks/useFetch';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

interface userInfo {
  page: boolean;
  title: string;
  data: string;
  state: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export const Email = ({ page, title, data, state, onChange, onReset }: userInfo) => {
  const { status, signupCheck } = useFetch();
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const handleEmail = () => signupCheck('username', data);
  const emailBtn = () => (status === 200 ? 'text-green-600 border-green-600' : status === 400 ? 'text-check-red border-check-red' : state ? 'text-black border-black' : 'text-gray-500 border-gray-400');
  const emailInput = () => (!data.length || state ? 'border-gray-400' : 'border-check-red outline-check-red');

  return (
    <>
      <div className="relative w-full inputForm">
        <label htmlFor="email" className="text-left text-gray-500">
          {title}
        </label>
        <div className="flex">
          <div className="w-full relative">
            <input required type="email" id="email" placeholder="email@email.com" className={`${emailInput()} inputStyle`} onChange={onChange} value={data} />
            {page && data && <MdOutlineCancel className="absolute top-1/4 right-4 w-6 h-6 text-gray-600 cursor-pointer" onClick={onReset} />}
          </div>
          {page || (
            <button type="button" className={`w-28 h-12 ml-4 border rounded ${emailBtn()}`} onClick={handleEmail} disabled={!state}>
              {m('DOUBLE_CHECK')}
            </button>
          )}
        </div>
        <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText'}>{data && !state ? '형식에 알맞는 이메일을 입력해주세요.' : null}</span>
      </div>
    </>
  );
};

export const Password = ({ page, title, data, state, onChange, onReset }: userInfo) => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  return (
    <>
      <label htmlFor="userPw1" className="text-left text-gray-500">
        {title}
      </label>
      <div className="relative">
        <input
          required
          type="password"
          name="userPw1"
          id="userPw1"
          placeholder={m('PLACEHOLDER_PASSWORD')}
          className={`${!data.length || state ? 'border-gray-400' : 'border-check-red outline-check-red'} inputStyle`}
          onChange={onChange}
          value={data}
        />
        {page && data ? <MdOutlineCancel className="absolute top-1/4 right-4 w-6 h-6 text-gray-700 cursor-pointer" onClick={onReset} /> : null}
      </div>
      <span className={page ? 'absolute top-[4.8rem] text-xs errorText' : 'errorText'}>{data && !state ? '형식에 알맞는 비밀번호를 입력해주세요.' : null}</span>
    </>
  );
};
