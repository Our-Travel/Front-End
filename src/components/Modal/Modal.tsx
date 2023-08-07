import React, { useRef, useEffect, Dispatch, SetStateAction, MouseEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { token } from '../../Atom/atom';

interface modal {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  data: dataProps[];
  page: string;
}

interface dataProps {
  text: string;
}

const Modal = ({ open, close, data, page }: modal) => {
  const outside = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const resetToken = useResetRecoilState(token);

  const closeModal = () => {
    close(false);
  };

  const clickCancel: any = (e: MouseEvent<HTMLDivElement> & KeyboardEvent<HTMLButtonElement>) => {
    if (outside.current === e.target || e.key === 'Escape') {
      closeModal();
    }
  };

  const logout = () => {
    resetToken();
    localStorage.removeItem('token');
    navigate('/');
    alert('로그아웃 되었습니다.👋');
  };

  useEffect(() => {
    document.addEventListener('click', clickCancel);
    document.addEventListener('keydown', clickCancel);
    return () => {
      document.removeEventListener('click', clickCancel);
      document.removeEventListener('keydown', clickCancel);
    };
  });

  return open ? (
    <div className="fixed w-[450px] h-full top-0 bg-black bg-opacity-30 z-30" ref={outside}>
      <div className="centerPosition relative w-64 h-36 rounded-xl text-xl overflow-hidden bg-white flex flex-col">
        {data.map(({ text }, index) => (
          <button
            type="button"
            key={index}
            className={`flex flex-col flex-grow items-center justify-center line after:absolute after:top-1/2 last:after:content-none hover:bg-gray-200 + ${page === 'mypage' ? 'last:text-check-red' : ''}`}
            onClick={() => {
              text === '취소' ? closeModal() : text === '로그아웃' ? logout() : null;
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  ) : null;
};

export default Modal;
