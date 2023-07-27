import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BsHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
  item: any;
}

const BoardModal = ({ setModal, item }: Props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  //모달창을 닫음
  const closeModal = () => {
    setModal(false);
  };

  //클릭되었을때 토글효과를 주기위함
  const handleClick = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };

  //키보드가 눌렸을때의 키별 효과들
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Escape') {
      setModal(false);
    } else if (event.key === 'Enter') {
      handleClick();
    }
  };
  const toggleFavorite = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };

  // 모달이 열릴 때 모달 내부의 첫 번째 버튼에 포커스를 줍니다.
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
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
          <Link to="/board/chatting">
            <button className="absolute bottom-3 w-3/5 h-10 left-1/2 -translate-x-1/2 bg-main-color py-1 rounded-lg text-white text-lg font-extrabold">채팅하러 가기</button>
          </Link>
          <div className="absolute right-10 bottom-5 flex items-center translate-x-2 hover:cursor-pointer" tabIndex={0} onClick={toggleFavorite}>
            {isFavorited ? <BsHandThumbsUpFill className=" w-[30px] h-[30px]" /> : <BsHandThumbsUp className=" w-[30px] h-[30px]" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardModal;
