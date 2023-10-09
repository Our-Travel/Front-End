import { Password } from 'components/EmailPassword/EmailPassword';
import Header from 'components/Header/Header';
import useInput from '../../hooks/useInput';
import useFetch from 'hooks/useFetch';
import { Button } from 'components/LoginButton/Button';
import { useEffect, useState, MouseEvent } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsQuestionSquare } from 'react-icons/bs';
import UploadProfile from 'components/Modal/UploadProfile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Profile } from './MypageInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileUpdate } from 'Atom/userAtom';
import { loginType } from '../../Atom/userAtom';

const profileBtn = [{ title: '프로필 이미지 편집' }, { title: '기본 이미지로 변경' }];
const profileToolTip = [
  { src: '/assets/profile.svg', alt: '일반 로그인 프로필 기본 이미지' },
  { src: '/assets/profileSocial.svg', alt: '소셜 로그인 프로필 기본 이미지' },
];

const ProfileEdit = () => {
  const newPassword = useInput();
  const newPwCheck = useInput();
  const newNickName = useInput();
  const { status, signupCheck } = useFetch();
  const [uploadModalOpen, setUploadModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [update, setUpdate] = useRecoilState(profileUpdate);
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
  const signType = useRecoilValue(loginType);
  const navigate = useNavigate();

  const openImagePopup = () => {
    setUploadModal(true);
  };
  const closeImagePopup = () => {
    setUploadModal(false);
  };

  // 사용자 프로필 정보 수정
  const userDataEdit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/profile`;
      const response = await axios.patch(
        url,
        {
          password: signType ? newPassword.data : '',
          verify_password: signType ? newPwCheck.data : '',
          nick_name: newNickName.data,
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

  // 프로필 사진 기본 이미지로 변경
  const defaultImage = async () => {
    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/profile-image`;
      const response = await axios.delete(url, config);
      alert(response.data.msg);
      setUpdate(!update);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  };

  const tooltipEnter = () => setShow(true);
  const tooltipLeave = () => setShow(false);

  const handleNickName = () => signupCheck('nickName', newNickName.data);
  const passwordInput = () => (!newPwCheck.data.length || newPassword.data === newPwCheck.data ? 'border-gray-400' : 'border-check-red outline-check-red');
  const nickNameInput = () => (!newNickName.data.length || newNickName.state ? 'border-gray-400' : 'border-check-red outline-check-red');
  const nickNameBtn = () => (status === 200 ? 'text-green-600 border-green-600' : status === 400 ? 'text-check-red border-check-red' : 'text-gray-500 border-gray-400');

  useEffect(() => {
    if ((signType && newPassword.data && newPassword.data === newPwCheck.data && status === 200) || (!signType && status)) {
      return setActive(true);
    } else {
      return setActive(false);
    }
  }, [newPassword.data, newPwCheck.data, status, signType]);

  return (
    <>
      <Header title={'프로필수정'} back={true} icon={''} />
      {!signType && (
        <p className="my-4">
          ※ <b className="text-main-color">소셜 로그인</b>은 비밀번호 변경이 불가능합니다.
        </p>
      )}
      {uploadModalOpen && <UploadProfile onClose={closeImagePopup} />}
      <form className="w-full px-4">
        <div className="items-center justify-center gap-5 my-8">
          <div className="relative">
            <Profile page={false} />
            <BsQuestionSquare className="absolute top-0 right-0 hover:text-main-color" onMouseEnter={tooltipEnter} onMouseLeave={tooltipLeave} />
            {show && (
              <div className="absolute top-5 right-2 flex flex-col gap-1 shadow-xl border rounded-lg px-5 py-3 bg-white">
                {profileToolTip.map(({ src, alt }, index) => (
                  <div key={index} className="flex items-center justify-center gap-1">
                    <img src={src} className="w-14 h-15" alt={alt} />
                    <span>{alt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3 mt-4">
            {profileBtn.map(({ title }, index) => (
              <button key={index} type="button" className="flex items-center justify-center gap-1 profileEditBtn" onClick={index ? defaultImage : openImagePopup}>
                {!index && <AiOutlineSetting />}
                {title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {signType && (
            <>
              <div className="inputForm">
                <Password page={false} title={'비밀번호 변경'} data={newPassword.data} state={newPassword.state} onChange={newPassword.onChange} onReset={newPassword.onReset} />
              </div>
              <div className="inputForm">
                <label htmlFor="userPw2" className="text-left text-gray-500">
                  비밀번호 재확인
                </label>
                <input required type="password" name="userPw2" id="userPw2" placeholder="영문, 숫자, 특수문자 포함 8~16자" className={`inputStyle ${passwordInput()}`} onChange={newPwCheck.onChange} />
                <span className="errorText">{newPwCheck.data.length && newPassword.data !== newPwCheck.data ? '비밀번호가 일치 하지 않습니다.' : null}</span>
              </div>
            </>
          )}
          <div className="inputForm">
            <label htmlFor={'nickName'} className="text-left text-gray-500">
              닉네임
            </label>
            <div className="flex justify-between">
              <input required type="text" name="nickName" id="nickName" placeholder="한글, 영문, 숫자 가능 3~8자" className={`shortInput ${nickNameInput()}`} onChange={newNickName.onChange} value={newNickName.data} />
              <button type="button" className={`w-24 h-12 border rounded ${nickNameBtn()}`} onClick={handleNickName} disabled={!newNickName.state}>
                중복확인
              </button>
            </div>
            <span className="errorText">{newNickName.data && !newNickName.state && '올바른 닉네임을 입력해주세요. (공백 불가)'}</span>
          </div>
        </div>
      </form>
      <div className="absolute w-full bottom-16 px-4">
        <Button name={'수정하기'} page={false} active={active} onClick={userDataEdit} />
      </div>
    </>
  );
};

export default ProfileEdit;
