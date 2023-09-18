import React, { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [data, setData] = useState<string>('');
  const [state, setState] = useState<boolean>(false);

  const emailValid = /([\w-.]+)@(([\w-]+\.)+)([a-zA-Z]{2,4})(\]?)$/;
  const passwordValid = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const nickNameValid = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{3,8}$/;
  const hashTagValid = /#[^\s]{2}/;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData(value);
    if (id === 'email') {
      setState(emailValid.test(value) ? true : false);
    } else if (id === 'userPw1') {
      setState(passwordValid.test(value) ? true : false);
    } else if (id === 'nickName') {
      setState(nickNameValid.test(value) ? true : false);
    } else if (id === 'hashTag' || id === 'hashTagModify') {
      setState(hashTagValid.test(value) ? true : false);
    }
  };

  const onReset = () => {
    setData('');
  };

  return { data, state, onChange, onReset };
};

export default useInput;
