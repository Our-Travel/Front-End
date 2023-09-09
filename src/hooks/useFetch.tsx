import axios from 'axios';
import { useState } from 'react';

interface hostMapData {
  region_code: number;
  count: number;
}

const useFetch = () => {
  const baseUrl = process.env.REACT_APP_REST_API_SERVER;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const [status, setStatus] = useState<number>(0);
  const [hostMap, setHostMap] = useState<hostMapData[]>([]);

  // 회원가입 이메일, 닉네임 중복체크
  const signupCheck = async (type: string, data: string) => {
    try {
      const url = `${baseUrl}/members/exists/${type}/${data}`;
      const response = await axios.get(url);
      setStatus(response.status);
      alert(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setStatus(error.response.status);
        alert(error.response.data.msg);
      } else {
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  // 지역별로 등록된 host count
  const hostDataCount = async () => {
    try {
      const url = `${baseUrl}/hosts/map`;
      const response = await axios.get(url, config);
      setHostMap(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.msg);
      }
    }
  };

  // 받은 지역코드와 맞는 host count 추출
  const hostMapData = (code: number) => {
    for (let data of hostMap) {
      if (data.region_code === code) return data.count;
    }
  };

  return { status, signupCheck, hostDataCount, hostMapData };
};

export default useFetch;
