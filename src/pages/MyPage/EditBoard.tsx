import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import WriteButton from '../../components/Chatting/WriteButton';

const EditBoard = () => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);

  const deleteBaord = () => {
    setDeleteModal(true);
  };

  const finishBaord = () => {
    setFinishModal(true);
  };

  //삭제하기버튼에 대한 함수
  const handleDeleteButton = () => {
    setDeleteModal(false); // 모달 닫기
    //삭제하기
  };

  const handleFinishButton = () => {
    setFinishModal(false);
  };

  return (
    <div className="relative h-screen">
      <Header title={'내가 작성한 글'} back={true} icon={''} />
      {deleteModal && <WriteButton title="글을 삭제하시겠습니까?" button="삭제하기" setModal={setDeleteModal} handleButton={handleDeleteButton} />}
      {finishModal && <WriteButton title="글을 마감하시겠습니까?" button="마감하기" setModal={setDeleteModal} handleButton={handleFinishButton} />}
      <div className="w-4/5 mx-auto">
        <h3 className="font-medium mt-5 mb-3 text-2xl">title</h3>
        <div className="border rounded-lg mx-4 h-[170px] text-left px-3 py-2">content</div>
        <div className="mt-8 mx-4 text-left">
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
        <div className="absolute mt-14 left-1/2 -translate-x-1/2 w-3/5">
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
