import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { token } from '../../Atom/atom';
// import { userInfo } from '../../Atom/userAtom';

const KakaoRedirect = () => {
  // const [info, setInfo] = useRecoilState(userInfo); user 상태관리 삭제함
  const navigate = useNavigate();
  const setToken = useSetRecoilState(token);

  // useEffect(() => {
  const code = new URL(window.location.href).searchParams.get('code');
  const grantType = 'authorization_code';
  const KAKAO_KEY = process.env.REACT_APP_REST_API_KEY;
  // const REDIRECT_URI = `${process.env.REACT_APP_REST_API_SERVER}/login/oauth2/code/kakao`;
  const REDIRECT_URI = 'http://localhost:3000/kakao/redirect';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_REST_API_SERVER}/oauth2/authorization/kakao`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   axios
  //     .post(`https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     })
  //     .then((res) => {
  //       const { access_token } = res.data;
  //       axios
  //         .post(
  //           'https://kapi.kakao.com/v2/user/me',
  //           {},
  //           {
  //             headers: {
  //               Authorization: `Bearer ${access_token}`,
  //               'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           // setInfo({ email: res.data.kakao_account.email, password: { data: '', state: false }, nickName: res.data.kakao_account.profile.nickname, pwCheck: { data: '', state: false } });
  //           setToken(access_token);
  //           localStorage.setItem('token', access_token);
  //           navigate('/main');
  //           alert('✅ 환영합니다. 좋은하루 되세요. ✅'); // 완성되면 msg로 문구 변경
  //         })
  //         .then(() => {
  //           console.log('성공');
  //         });
  //     })
  //     .catch(() => {
  //       navigate('/signin');
  //       alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
  //     });
  // }, []);

  return <></>;
};

export default KakaoRedirect;
