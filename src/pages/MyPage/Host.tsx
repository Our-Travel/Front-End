import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import { LoginButton } from '../../components/LoginButton/LoginButton';
import Select, { SingleValue } from 'react-select';
import React, { useState, useEffect, MouseEvent } from 'react';
import useInput from '../../hooks/useInput';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

interface optionType {
  value: string;
  label: string;
}

const cityData: optionType[] = [
  { value: '서울', label: '서울' },
  { value: '경기', label: '경기' },
  { value: '부산', label: '부산' },
  { value: '세종', label: '세종' },
  { value: '제주', label: '제주' },
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
  const myInfo = useInput();
  const hashTag = useInput();
  const navigate = useNavigate();

  const hostRegist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/hosts';
      const response: AxiosResponse = await axios.post(url, {
        introduction: myInfo.data,
        hash_tag: hashTag.data,
        region: city?.label,
      });
      alert(response.data.msg);
      navigate('/mypage');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        alert(error.response.data.msg);
      } else {
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const cityHandle = (option: SingleValue<optionType>) => {
    setCity(option);
  };
  const areaHandle = (option: SingleValue<optionType>) => {
    setArea(option);
  };

  const hashTagCheck = () => {
    return hashTag.data.length > 0 && !hashTag.data.includes('#') ? '단어 앞에 #을 반드시 입력해주세요.' : '';
  };

  useEffect(() => {
    myInfo.data && hashTag.data && hashTag.data.includes('#') && city && area ? setActive(true) : setActive(false);
  }, [myInfo.data, hashTag.data, city, area]);

  return (
    <div className="flex flex-col">
      <Header title={'Host 등록'} back={true} icon={''} />
      <div className="flex flex-col gap-4 my-6 line">
        <Profile />
        <button className="w-[25rem] mx-auto h-9 mb-3 border rounded border-main-color text-main-color hover:bg-main-color hover:text-white">프로필 수정</button>
      </div>
      <form className="flex flex-col gap-5 text-left mx-auto">
        <div className="inputForm">
          <label htmlFor="introduction">한줄소개</label>
          <input required type="text" id="introduction" className="inputStyle" placeholder="나를 소개해주세요" onChange={myInfo.onChange} value={myInfo.data} />
          {/* <span className="errorText"></span> */}
        </div>
        <div className="inputForm">
          <label htmlFor="hashTag">해시태그</label>
          <input required type="text" id="hashTag" className="inputStyle" placeholder="#맛집전문  #가이드투어" onChange={hashTag.onChange} value={hashTag.data} />
          <span className="errorText">{hashTagCheck()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2>위치</h2>
          <div className="flex flex-row gap-4">
            <Select className="w-44 flex-grow" options={cityData} maxMenuHeight={120} placeholder="시 / 도" onChange={cityHandle} />
            <Select className="w-44 flex-grow" options={areaData} maxMenuHeight={120} placeholder="시 / 군 / 구" onChange={areaHandle} />
          </div>
        </div>
        <div className="absolute bottom-16">
          <LoginButton name={'등록하기'} page={false} active={active} onClick={hostRegist} />
        </div>
      </form>
    </div>
  );
};

export default Host;
