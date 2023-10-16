import { Password } from 'components/EmailPassword/EmailPassword';
import Header from 'components/Header/Header';
import useInput from '../../hooks/useInput';
import useFetch from 'hooks/useFetch';
import { Button } from 'components/Button/Button';
import { useEffect, useState, MouseEvent } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import UploadProfile from 'components/Modal/UploadProfile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Profile } from './MypageInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileUpdate } from 'Atom/userAtom';
import { loginType } from '../../Atom/userAtom';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const ProfileEdit = () => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const profileBtn = [{ title: m('PROFILE_IMAGE_EDIT') }, { title: m('DEFAUIT_IMAGE') }];
  const newPassword = useInput();
  const newPwCheck = useInput();
  const newNickName = useInput();
  const { status, signupCheck } = useFetch();
  const [uploadModalOpen, setUploadModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
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
      localStorage.setItem('token', response.headers.authentication);
      localStorage.removeItem('nickname');
      localStorage.setItem('nickname', newNickName.data);
      alert(response.data.msg);

      navigate('/mypage');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('실패' + error.response?.data.msg);
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
  const nickNameBtn = () => (status === 200 ? 'text-green-600 border-green-600' : status === 400 ? 'text-check-red border-check-red' : newNickName.state ? 'text-black border-black' : 'text-gray-500 border-gray-400');

  useEffect(() => {
    if ((signType && newPassword.data && newPassword.data === newPwCheck.data && status === 200) || (!signType && status)) {
      return setActive(true);
    } else {
      return setActive(false);
    }
  }, [newPassword.data, newPwCheck.data, status, signType]);

  return (
    <>
      <Header title={'PROFILE_EDIT'} back={true} icon={''} />
      {!signType && <p className="my-4 text-red-400">{m('SOCIAL_LOGIN_PASSWORD')}</p>}
      {uploadModalOpen && <UploadProfile onClose={closeImagePopup} />}
      <form className="w-full px-4">
        <div className="items-center justify-center gap-5 my-8">
          <div className="relative">
            <Profile page={false} />
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
                <Password page={false} title={m('PASSWORD_CHANGE')} data={newPassword.data} state={newPassword.state} onChange={newPassword.onChange} onReset={newPassword.onReset} />
              </div>
              <div className="inputForm">
                <label htmlFor="userPw2" className="text-left text-gray-500">
                  {m('PASSWORD_CHECK')}
                </label>
                <input required type="password" name="userPw2" id="userPw2" placeholder="영문, 숫자, 특수문자 포함 8~16자" className={`inputStyle ${passwordInput()}`} onChange={newPwCheck.onChange} />
                <span className="errorText">{newPwCheck.data.length && newPassword.data !== newPwCheck.data ? '비밀번호가 일치 하지 않습니다.' : null}</span>
              </div>
            </>
          )}
          <div className="inputForm">
            <label htmlFor={'nickName'} className="text-left text-gray-500">
              {m('NICKNAME')}
            </label>
            <div className="flex justify-between">
              <input required type="text" name="nickName" id="nickName" placeholder="한글, 영문, 숫자 가능 3~10자" className={`inputStyle ${nickNameInput()}`} onChange={newNickName.onChange} value={newNickName.data} />
              <button type="button" className={`w-28 h-12 ml-7 border rounded ${nickNameBtn()}`} onClick={handleNickName} disabled={!newNickName.state}>
                {m('DOUBLE_CHECK')}
              </button>
            </div>
            <span className="errorText">{newNickName.data && !newNickName.state && '올바른 닉네임을 입력해주세요. (공백 불가)'}</span>
          </div>
        </div>
      </form>
      <div className="absolute w-full bottom-16 px-4">
        <Button name={'EDIT'} page={false} active={active} onClick={userDataEdit} />
      </div>
    </>
  );
};

export default ProfileEdit;
