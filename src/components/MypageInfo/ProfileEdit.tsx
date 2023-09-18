import { Password } from 'components/EmailPassword/EmailPassword';
import Header from 'components/Header/Header';
import ProfileCheck from './ProfileCheck';
import useInput from '../../hooks/useInput';
import useFetch from 'hooks/useFetch';
import { Button } from 'components/LoginButton/Button';
import { useEffect, useState, MouseEvent } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import UploadProfile from 'components/Modal/UploadProfile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Profile } from './MypageInfo';
import { useRecoilState } from 'recoil';
import { profileUpdate } from 'Atom/userAtom';

const profileBtn = [{ title: '프로필 이미지 편집' }, { title: '기본 이미지로 변경' }];

const ProfileEdit = () => {
  const newPassword = useInput();
  const newPwCheck = useInput();
  const newNickName = useInput();
  const { status, signupCheck } = useFetch();
  const [uploadModalOpen, setUploadModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [update, setUpdate] = useRecoilState(profileUpdate);
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
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
          password: newPassword.data,
          verify_password: newPwCheck.data,
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

  const handleNickName = () => signupCheck('nickName', newNickName.data);
  const passwordInput = () => (!newPwCheck.data.length || newPassword.data === newPwCheck.data ? 'border-gray-400' : 'border-check-red outline-check-red');
  const nickNameInput = () => (!newNickName.data.length || newNickName.state ? 'border-gray-400' : 'border-check-red outline-check-red');
  const nickNameBtn = () => (status === 200 ? 'text-green-600 border-green-600' : status === 400 ? 'text-check-red border-check-red' : 'text-gray-500 border-gray-400');

  useEffect(() => {
    newPassword.data && newPassword.data === newPwCheck.data && status === 200 ? setActive(true) : setActive(false);
  }, [newPassword.data, newPwCheck.data, status]);

  return (
    <>
      <Header title={'프로필수정'} back={true} icon={''} />
      {uploadModalOpen && <UploadProfile onClose={closeImagePopup} />}
      <form className="w-[25rem] mx-auto">
        <div className="flex flex-col items-center justify-center gap-5 my-4">
          <Profile page={false} />
          <div className="flex gap-3">
            {profileBtn.map(({ title }, index) => (
              <button key={index} type="button" className="flex items-center justify-center gap-1 profileEditBtn" onClick={index ? defaultImage : openImagePopup}>
                {!index && <AiOutlineSetting />}
                {title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
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
        <div className="absolute bottom-16">
          <Button name={'수정하기'} page={false} active={active} onClick={userDataEdit} />
        </div>
      </form>
    </>
  );
};

export default ProfileEdit;
