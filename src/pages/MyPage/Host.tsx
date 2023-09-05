import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import { Button } from '../../components/LoginButton/Button';
import Select, { SingleValue } from 'react-select';
import React, { useState, useEffect, MouseEvent } from 'react';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import regions from '../../util/region';
import { useRecoilValue } from 'recoil';
import { hostCheck } from '../../Atom/userAtom';

interface optionType {
  value: number;
  label: string;
}

interface newData {
  new_intro: string;
  new_hashTag: string;
  new_region: number;
}

const Host = () => {
  const [active, setActive] = useState<boolean>(false);
  const [city, setCity] = useState<SingleValue<optionType>>(null);
  const [newCity, setNewCity] = useState<SingleValue<optionType>>(null);
  const [modifyData, setModifyData] = useState<newData[]>([]);
  const hostActive = useRecoilValue(hostCheck);
  const myInfo = useInput();
  const hashTag = useInput();
  const myInfoModify = useInput();
  const hashTagModify = useInput();
  const navigate = useNavigate();
  const regionData: optionType[] = [];

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  regions.map((region) => {
    regionData.push({ label: region.key, value: region.value });
  });

  // host 등록
  const hostRegist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts`;
      const response = await axios.post(
        url,
        {
          introduction: myInfo.data,
          hash_tag: hashTag.data,
          region_code: city?.value,
        },
        config
      );
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

  // host 수정
  const hostModify = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts`;
      const response = await axios.patch(
        url,
        {
          introduction: myInfoModify.data,
          hash_tag: hashTagModify.data,
          region_code: newCity?.value,
        },
        config
      );
      alert(response.data.msg);
      navigate('/mypage');
    } catch (error) {
      alert('데이터를 받아오는 과정에서 문제가 생겼습니다.');
    }
  };

  // 수정된 정보가져오기
  useEffect(() => {
    const newHostData = async () => {
      try {
        const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts`;
        const response = await axios.get(url, config);
        setModifyData([{ new_intro: response.data.data.introduction, new_hashTag: response.data.data.hash_tag, new_region: response.data.data.region_code }]);
      } catch (error) {
        console.log(error);
      }
    };
    newHostData();
  }, [modifyData]);

  // host 삭제
  const hostDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts`;
      const response = await axios.delete(url, config);
      alert(response.data.msg);
      navigate('/mypage');
    } catch (error) {
      alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
    }
  };

  // host 수정된 정보를 태그 id에 맞는 값 가져오기
  const newHostData = (id: string) => {
    for (let item of modifyData) {
      if (id === 'infoModify') return item.new_intro;
      else if (id === 'hashTagModify') return item.new_hashTag;
      else {
        const findLabel = regionData.find((el) => el.value === item.new_region);
        return findLabel?.label;
      }
    }
  };

  const regionHandle = (option: SingleValue<optionType>) => setCity(option);
  const regionModify = (option: SingleValue<optionType>) => setNewCity(option);
  const hashTagCheck = () => ((hashTag.data.length > 0 && !hashTag.state) || (hashTagModify.data.length > 0 && !hashTagModify.state) ? '단어 앞에 #을 반드시 입력해주세요.(2자 이상)' : '');

  useEffect(() => {
    (myInfo.data.length < 25 && hashTag.data && hashTag.state && city) || (myInfoModify.data.length < 25 && hashTagModify.data && hashTagModify.state && newCity) ? setActive(true) : setActive(false);
  }, [myInfo.data, hashTag.data, hashTag.state, myInfoModify.data, hashTagModify.data, hashTagModify.state, city, newCity]);

  return (
    <div className="flex flex-col">
      <Header title={hostActive ? 'Host 수정' : 'Host 등록'} back={true} icon={''} />
      <div className={`flex flex-col gap-4 line ${hostActive ? 'mt-6' : 'my-6'}`}>
        <Profile />
        <button className="w-[25rem] mx-auto h-9 mb-3 border rounded border-main-color text-main-color hover:bg-main-color hover:text-white">프로필 수정</button>
      </div>
      <form className="flex flex-col gap-3 text-left mx-auto">
        {hostActive && (
          <p className="text-sm mt-2">
            <b className="text-main-color">※ 기존에 등록된 정보</b>를 참고하여 <b className="text-main-color">수정</b>해주세요.
          </p>
        )}
        <div className="inputForm">
          <label htmlFor="introduction">한줄소개</label>
          <div className="relative flex flex-row items-center">
            <input
              required
              type="text"
              id={hostActive ? 'infoModify' : 'infoRegist'}
              className="inputStyle placeholder:placeholder:overflow-x-auto"
              placeholder={hostActive ? newHostData('infoModify') : '나를 소개해주세요.(25자 제한)'}
              maxLength={25}
              onChange={hostActive ? myInfoModify.onChange : myInfo.onChange}
              value={hostActive ? myInfoModify.data : myInfo.data}
            />
            {(myInfo.data || myInfoModify.data) && <MdOutlineCancel className="absolute right-3 w-6 h-6 text-gray-600 cursor-pointer" onClick={hostActive ? myInfoModify.onReset : myInfo.onReset} />}
          </div>
          <span className="errorText">{myInfo.data.length >= 25 || myInfoModify.data.length >= 25 ? '글자수가 25자로 제한됩니다.' : ''}</span>
        </div>
        <div className="inputForm">
          <label htmlFor="hashTag">해시태그</label>
          <input
            required
            type="text"
            id={hostActive ? 'hashTagModify' : 'hashTag'}
            className="inputStyle placeholder:overflow-x-auto"
            placeholder={hostActive ? newHostData('hashTagModify') : '#맛집전문 #가이드투어'}
            onChange={hostActive ? hashTagModify.onChange : hashTag.onChange}
            value={hostActive ? hashTagModify.data : hashTag.data}
          />
          <span className="errorText">{hashTagCheck()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2>위치</h2>
          <Select
            id={hostActive ? 'regionModify' : 'region'}
            className="w-full"
            options={regionData}
            maxMenuHeight={hostActive ? 190 : 200}
            placeholder={hostActive ? newHostData('regionModify') : '지역을 선택해 주세요.'}
            onChange={hostActive ? regionModify : regionHandle}
          />
        </div>
        <div className="absolute flex flex-col gap-2 bottom-16">
          <Button name={hostActive ? '수정하기' : '등록하기'} page={false} active={active} onClick={hostActive ? hostModify : hostRegist} />
          {hostActive && <Button name={'Host 삭제하기'} page={true} active={active} onClick={hostDelete} />}
        </div>
      </form>
    </div>
  );
};

export default Host;
