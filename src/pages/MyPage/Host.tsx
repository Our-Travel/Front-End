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
  const url = `${process.env.REACT_APP_REST_API_SERVER}/hosts`;
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

  regions.map((region) => {
    regionData.push({ label: region.key, value: region.value });
  });

  const handleEdit = () => {
    navigate('/mypage/ProfileEdit');
  };

  // host 등록
  const hostRegist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
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
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  // host 수정
  const hostModify = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
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
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  // 수정된 정보가져오기
  useEffect(() => {
    if (hostActive) {
      const hostGetNewData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_REST_API_SERVER}/hosts`, config);
          setModifyData([{ new_intro: response.data.data.introduction, new_hashTag: response.data.data.hash_tag, new_region: response.data.data.region_code }]);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            alert(error.response?.data.msg);
          }
        }
      };
      hostGetNewData();
    }
  }, [hostActive]);

  // host 수정된 정보를 태그 id에 맞는 값 표시
  const newHostData = (id: string) => {
    for (let data of modifyData) {
      if (id === 'infoModify') return data.new_intro;
      else if (id === 'hashTagModify') return data.new_hashTag;
      else {
        const findLabel = regionData.find((item) => item.value === data.new_region);
        return findLabel?.label;
      }
    }
  };

  // host 삭제
  const hostDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.delete(url, config);
      alert(response.data.msg);
      navigate('/mypage');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
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
    <div>
      <Header title={hostActive ? 'Host 수정' : 'Host 등록'} back={true} icon={''} />
      <div className="px-4 line">
        <Profile page={true} />
        <button className="profileEdit" onClick={handleEdit}>
          프로필 수정
        </button>
      </div>
      <form className={`flex flex-col px-4 ${hostActive ? 'gap-1 mt-2' : 'gap-2 mt-4'} text-left mx-auto`}>
        {hostActive && <p className="text-sm font-semibold text-main-color">※ 기존에 등록된 정보를 참고하여 수정 해주세요.</p>}
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
      </form>
      <div className="w-full px-4 absolute bottom-16">
        <div className=" my-2">
          <Button name={hostActive ? '수정하기' : '등록하기'} page={false} active={active} onClick={hostActive ? hostModify : hostRegist} />
        </div>
        <div>{hostActive && <Button name={'Host 삭제하기'} page={true} active={active} onClick={hostDelete} />}</div>
      </div>
    </div>
  );
};

export default Host;
