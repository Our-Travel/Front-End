import React, { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import WriteButton from '../../components/Chatting/WriteButton';
import axios from 'axios';

interface Props {
  setEditBoard: Dispatch<SetStateAction<boolean>>;
  item: any;
}

const EditBoard = ({ setEditBoard, item }: Props) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);

  //현재페이지 닫기
  const closeEdit = () => {
    setEditBoard(false);
  };

  //버튼클릭시 모달열리게하기
  const deleteBaord = () => {
    setDeleteModal(true);
  };
  const finishBaord = () => {
    setFinishModal(true);
  };

  //삭제하기모달 -> 삭제하기 누르면 넘어오는 함수
  const handleDeleteButton = () => {
    setDeleteModal(false); // 모달 닫기

    deletetest();
  };

  //게시글 삭제 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const deletetest = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 여행 게시글 작성 요청
      const boardsUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/4`;
      await axios.delete(boardsUrl, {
        headers: headers,
      });

      alert('게시글이 성공적으로 삭제되었습니다!');
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

  //마감하기모달 -> 마감하기 버튼 클릭시 넘어오는 함수
  const handleFinishButton = () => {
    setFinishModal(false);
    //마감하기
  };

  return (
    <div className="relative h-full w-full bg-white">
      {deleteModal && <WriteButton title="글을 삭제하시겠습니까?" button="삭제하기" setModal={setDeleteModal} handleButton={handleDeleteButton} />}
      {finishModal && <WriteButton title="글을 마감하시겠습니까?" button="마감하기" setModal={setFinishModal} handleButton={handleFinishButton} />}
      <div className="mx-auto pt-8">
        <h3 className="font-medium mb-5 text-2xl">{item.title}</h3>
        <button onClick={closeEdit} className="absolute top-10 right-7">
          <AiOutlineClose className="w-[30px] h-[30px]" />
        </button>
        <div className="border rounded-lg mx-4 h-[170px] text-left px-3 py-2">{item.content}</div>
        <div className="mt-8 mx-4 text-left">
          <div className="flex text-sm my-3">
            <div className="w-1/5 font-semibold text-gray-600">여행지</div>
            <span className="text-gray-500">{item.region_code}</span>
          </div>
          <div className="flex text-sm my-3">
            <div className="w-1/5 font-semibold text-gray-600">모집기간</div>
            <span className="text-gray-500">
              {item.recruitment_period_start} ~ {item.recruitment_period_end}
            </span>
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
        <div className="my-10 left-1/2 mx-20">
          <button className="w-full h-8 my-2  bg-main-color rounded-lg text-white text-lg font-semibold">수정하기</button>
          <button onClick={deleteBaord} className="w-full h-8 my-2  bg-main-color rounded-lg text-white text-lg font-semibold">
            삭제하기
          </button>
          <button onClick={finishBaord} className="w-full h-8 my-2  bg-main-color rounded-lg text-white text-lg font-semibold">
            마감하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
