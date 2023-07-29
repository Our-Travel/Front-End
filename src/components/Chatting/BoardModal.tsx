import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BsHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs';
import useLoginCheck from '../../hooks/useLoginCheck';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
  item: any;
}

const BoardModal = ({ setModal, item }: Props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  //로그인 되어있는지 확인하는 커스텀 훅
  const loginCheck = useLoginCheck();
  const navigate = useNavigate();
  const chatButtonRef = useRef<HTMLButtonElement>(null); // "채팅하러 가기" 버튼에 대한 ref 추가
  const thumbsUpRef = useRef<HTMLDivElement>(null); // thumbsUpRef의 형식을 RefObject<HTMLDivElement>로 변경

  //모달창을 닫음
  const closeModal = () => {
    setModal(false);
  };

  //클릭되었을때 토글효과를 주기위함
  const handleClick = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };

  //키보드가 눌렸을때의 키별 효과들
  const handleKeyDown = (event: { preventDefault(): unknown; key: string }) => {
    if (event.key === 'Escape') {
      setModal(false);
    }
    if (event.key === 'Enter') {
      if (chatButtonRef.current === document.activeElement) {
        // "채팅하러 가기" 버튼이 포커스를 받았을 때의 동작
        handleChatButtonClick();
      }
      if (thumbsUpRef.current === document.activeElement) {
        // "따봉" 버튼이 포커스를 받았을 때의 동작
        toggleFavorite();
      }
    }
  };

  //채팅하러가기 버튼을 눌렀을때 함수
  const handleChatButtonClick = () => {
    const isLoggedIn = loginCheck();
    if (isLoggedIn) {
      navigate('/board/chatting');
    } else {
      navigate('/signin');
    }
  };

  //따봉버튼 눌렀을때 함수
  const toggleFavorite = () => {
    //true false로 값을 받아옴
    const isLoggedIn = loginCheck();
    if (isLoggedIn) {
      setIsFavorited((prevIsFavorited) => !prevIsFavorited);
    } else {
      navigate('/signin');
    }
  };

  //모달로 뜨게될 게시글 하나의 상세정보를 불러오는 통신 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const boardId = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 여행 게시글 작성 요청
      const boardUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/3`;
      const response = await axios.get(boardUrl, {
        headers: headers,
      });

      const title = response.data.data.title;
      const content = response.data.data.content;
      const region = response.data.data.region_code;
      const recruitment_period_start = response.data.data.recruitment_period_start;
      const recruitment_period_end = response.data.data.recruitment_period_end;
      const journey_period_start = response.data.data.journey_period_start;
      const journey_period_end = response.data.data.journey_period_end;
      const travelers = response.data.data.number_of_travelers;
      console.log('제목:', title);
      console.log('내용:', content);
      console.log('지역 코드:', region);
      console.log('모집 시작일:', recruitment_period_start);
      console.log('모집 종료일:', recruitment_period_end);
      console.log('여행 시작일:', journey_period_start);
      console.log('여행 종료일:', journey_period_end);
      console.log('여행자 수:', travelers);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // 에러가 발생하면 해당 에러 메시지를 알림으로 보여줌
        alert(error.response.data.msg);
      } else {
        // 기타 에러 처리
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  // 모달이 열릴 때 모달 내부의 첫 번째 버튼에 포커스를 줍니다.
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
    boardId();
  }, []);

  return (
    <div ref={modalRef} onKeyDown={handleKeyDown} tabIndex={0} className="relative shadow-2xl">
      <div onClick={closeModal} className="z-0 absolute w-full h-screen modalPosition bg-gray-400 opacity-25" />
      {item && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[450px] bg-white rounded-xl">
          <h3 className="text-xl font-semibold my-4">{item.title}</h3>
          <div className="border rounded-lg mx-4 h-[170px] text-left px-3 py-2">{item.content}</div>
          <div className="mt-3 mx-4 text-left">
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">여행지</div>
              <span className="text-gray-500">받아온 여행위치 띄우기!!</span>
            </div>
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">모집기간</div>
              <span className="text-gray-500">받아온 모집기간 띄우기!!</span>
            </div>
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">여행기간</div>
              <span className="text-gray-500">2023/08/01 ~ 2023/08/06</span>
            </div>
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">여행인원</div>
              <span className="text-gray-500">ex)4</span>
            </div>
          </div>
          {/* 추후에 해당 게시글을 작성한 사람과의 채팅으로 넘어가게 변경해야함 */}

          <button ref={chatButtonRef} onClick={handleChatButtonClick} className="absolute bottom-3 w-3/5 h-10 left-1/2 -translate-x-1/2 bg-main-color py-1 rounded-lg text-white text-lg font-extrabold">
            채팅하러 가기
          </button>

          <div className="absolute right-10 bottom-5 flex items-center translate-x-2 hover:cursor-pointer" tabIndex={0} onClick={toggleFavorite} ref={thumbsUpRef}>
            {isFavorited ? <BsHandThumbsUpFill className=" w-[30px] h-[30px]" /> : <BsHandThumbsUp className=" w-[30px] h-[30px]" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardModal;
