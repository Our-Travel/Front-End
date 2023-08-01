import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import useLoginCheck from '../../hooks/useLoginCheck';
import { useNavigate } from 'react-router-dom';
import regions from '../../util/region';
import { getStatusInKorean } from '../../util/status';
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

  /* -------------------------------------------------------------------------- */
  /*                               //따봉버튼 눌렀을때 함수                               */
  /* -------------------------------------------------------------------------- */
  const toggleFavorite = async () => {
    //true false로 값을 받아옴
    const isLoggedIn = loginCheck();
    if (isLoggedIn) {
      setIsFavorited((prevIsFavorited) => !prevIsFavorited);
      const boardId = item.board_id;
      const storedToken = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };
      try {
        const boardsUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/${boardId}/likes`;
        const response = await axios.post(boardsUrl, {
          headers: headers,
        });
        console.log(response);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          alert(error.response.data.msg);
        } else {
          alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
        }
      }
    } else {
      navigate('/signin');
    }
  };

  // 모달이 열릴 때 모달 내부의 첫 번째 버튼에 포커스를 줍니다.
  useEffect(() => {
    setIsFavorited(item.like_board_status);
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  //지역코드를 지역명으로 전처리
  const findKeyByValue = (value: number) => {
    const region = regions.find((region) => region.value === value);
    return region ? region.key : 'Unknown'; // 해당하는 key를 찾으면 출력하고, 없으면 'Unknown'을 출력
  };
  const location = findKeyByValue(item.region_code);

  /* -------------------------------------------------------------------------- */
  /*                                 //모집상태 전처리                                 */
  /* -------------------------------------------------------------------------- */
  const statusFromServer = item.recruitment_status; // 서버로부터 받은 상태 (예: OPEN, UPCOMING 등)
  const statusInKorean = getStatusInKorean(statusFromServer); // 한글 상태로 변환

  const isButtonActive = statusFromServer === 'OPEN';

  return (
    <div ref={modalRef} onKeyDown={handleKeyDown} tabIndex={0} className=" shadow-2xl">
      <div onClick={closeModal} className="absolute w-full h-screen modalPosition bg-gray-400 opacity-25" />
      {item && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[450px] bg-white rounded-xl">
          <h3 className="text-xl font-semibold my-4">{item.title}</h3>
          <div className="border rounded-lg mx-4 h-[170px] text-left px-3 py-2">{item.content}</div>
          <div className="mt-3 mx-4 text-left">
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">여행지</div>
              <span className="text-gray-500">{location}</span>
            </div>
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">모집기간</div>
              <span className="text-gray-500">
                {item.recruitment_period_start} ~ {item.recruitment_period_end}
              </span>
              <span className="ml-6 font-semibold text-orange-500 animate-pulse">{statusInKorean}</span>
            </div>
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">여행기간</div>
              <span className="text-gray-500">
                {item.journey_period_start} ~ {item.journey_period_end}
              </span>
            </div>
            <div className="flex text-sm my-3">
              <div className="w-1/5 font-semibold text-gray-600">여행인원</div>
              <span className="text-gray-500">{item.number_of_travelers}</span>
            </div>
          </div>
          {/* 추후에 해당 게시글을 작성한 사람과의 채팅으로 넘어가게 변경해야함 */}

          <button ref={chatButtonRef} onClick={handleChatButtonClick} disabled={!isButtonActive} className="absolute bottom-3 w-3/5 h-10 left-1/2 -translate-x-1/2 bg-main-color py-1 rounded-lg text-white text-lg font-extrabold">
            채팅하러 가기
          </button>

          <div className="absolute right-10 bottom-5 flex items-center translate-x-2 hover:cursor-pointer" tabIndex={0} onClick={toggleFavorite} ref={thumbsUpRef}>
            {isFavorited ? <FaThumbsUp className=" w-[30px] h-[30px]" /> : <FaRegThumbsUp className=" w-[30px] h-[30px]" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardModal;
