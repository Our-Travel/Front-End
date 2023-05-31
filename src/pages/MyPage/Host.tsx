import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import { LoginButton } from '../../components/LoginButton/LoginButton';
import Select, { SingleValue } from 'react-select';
import React, { useState, useRef, useEffect } from 'react';
import useInput from '../../hooks/useInput';

interface optionType {
  value: string;
  label: string;
}

const cityData: optionType[] = [
  { value: '시도명1', label: '시도명1' },
  { value: '시도명2', label: '시도명2' },
  { value: '시도명3', label: '시도명3' },
  { value: '시도명4', label: '시도명4' },
  { value: '시도명5', label: '시도명5' },
];

const areaData: optionType[] = [
  { value: '시군구명1', label: '시군구명1' },
  { value: '시군구명2', label: '시군구명2' },
  { value: '시군구명3', label: '시군구명3' },
  { value: '시군구명4', label: '시군구명4' },
  { value: '시군구명5', label: '시군구명5' },
];

const Host = () => {
  const [active, setActive] = useState<boolean>(false);
  const [city, setCity] = useState<SingleValue<optionType>>(null);
  const [area, setArea] = useState<SingleValue<optionType>>(null);
  const [success, setSuccess] = useState<number>(0);
  const myInfo = useInput();
  const hashTag = useInput();

  const cityHandle = (option: SingleValue<optionType>) => {
    setCity(option);
  };

  const areaHandle = (option: SingleValue<optionType>) => {
    setArea(option);
  };

  const hashCheck = () => {
    return hashTag.data.length > 0 && !hashTag.data.includes('#') ? '단어 앞에 #을 반드시 입력해주세요.' : '';
  };

  useEffect(() => {
    myInfo.data && hashTag.data && hashTag.data.includes('#') && city && area ? setActive(true) : setActive(false);
  }, [myInfo.data, hashTag.data, city, area]);

  return (
    <div className="flex flex-col w-[25rem] mx-auto">
      <Header title={'Host 등록'} />
      <div className="flex flex-col gap-5 my-5 line">
        <Profile />
        <button className="w-[25rem] h-9 mb-3 border rounded border-main-color text-main-color hover:bg-main-color hover:text-white">프로필 수정</button>
      </div>
      <form className="flex flex-col gap-5 text-left">
        <div className="inputForm">
          <label htmlFor="" className="">
            한줄소개
          </label>
          <input required type="text" className="inputStyle" placeholder="나를 소개해주세요" onChange={myInfo.onChange} value={myInfo.data} />
          {/* <span className="errorText"></span> */}
        </div>
        <div className="inputForm">
          <label htmlFor="" className="">
            해시태그
          </label>
          <input required type="text" className="inputStyle" placeholder="#맛집전문  #가이드투어" onChange={hashTag.onChange} />
          <span className="errorText">{hashCheck()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="">
            위치
          </label>
          <div className="flex flex-row gap-4">
            <Select className="w-44 flex-grow" options={cityData} name="city" maxMenuHeight={120} placeholder="시 / 도" onChange={cityHandle} />
            <Select className="w-44 flex-grow" options={areaData} name="area" maxMenuHeight={120} placeholder="시 / 군 / 구" onChange={areaHandle} />
          </div>
        </div>
        <div className="absolute bottom-16">
          <LoginButton name={'등록하기'} page={false} active={active} success={success} click={null} />
        </div>
      </form>
    </div>
  );
};

export default Host;
