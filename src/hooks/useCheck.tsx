import axios from 'axios';
import { useState } from 'react';

const useCheck = () => {
  const [status, setStatus] = useState<number>(0);

  const nickNameCheck = async (type: string, data: string) => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/exists/${type}/${data}`;
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

  return { status, nickNameCheck };
};

export default useCheck;
