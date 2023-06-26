import React, { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [data, setData] = useState<string>('');
  const [state, setState] = useState<boolean>(false);

  const emailValid = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordValid = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const nickNameValid = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{3,8}$/;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
    if (e.target.id === 'email') {
      setState(emailValid.test(e.target.value) ? true : false);
    } else if (e.target.id === 'userPw1') {
      setState(passwordValid.test(e.target.value) ? true : false);
    } else if (e.target.id === 'nickName') {
      setState(nickNameValid.test(e.target.value) ? true : false);
    }
  };

  const onReset = () => {
    setData('');
  };

  return { data, state, onChange, onReset };
};

export default useInput;
