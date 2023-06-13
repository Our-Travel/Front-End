import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { token, userLogin } from '../../recoil/loginAtom';

const KakaoRedirect = () => {
  const [userInfo, setUserInfo] = useRecoilState(userLogin);
  const navigate = useNavigate();
  const setToken = useSetRecoilState(token);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const grantType = 'authorization_code';
    const KAKAO_KEY = process.env.REACT_APP_REST_API_KEY;
    // const REDIRECT_URI = 'http://localhost:8080/oauth2/kakao';
    const REDIRECT_URI = 'http://localhost:3000/kakao/redirect';

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then((res) => {
        const { access_token } = res.data;
        axios
          .post(
            'https://kapi.kakao.com/v2/user/me',
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
            }
          )
          // 현재 mypage랑 안맞는 이슈 요청하는 Url 403
          .then((res) => {
            setUserInfo({ email: res.data.kakao_account.email, nickName: res.data.kakao_account.profile.nickname });
            setToken(access_token);
            localStorage.setItem('token', access_token);
            navigate('/main');
            alert('✅ 환영합니다. 좋은하루 되세요. ✅');
          })
          .then(() => {
            console.log('성공');
          });
      })
      .catch(() => {
        navigate('/signin');
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      });
  }, []);

  return <></>;
};

export default KakaoRedirect;
