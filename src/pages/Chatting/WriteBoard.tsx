import React, { ChangeEvent, useState } from 'react';
import Header from '../../components/Header/Header';
import WriteButton from '../../components/Chatting/WriteButton';

const WriteBoard = () => {
  const [modalOpen, setModal] = useState<boolean>(false);

  const isOpen = () => setModal(!modalOpen);

  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="relative h-[100vh]">
      <Header title="게시글 작성" back={true} icon={''} />
      {modalOpen && <WriteButton open={modalOpen} close={setModal} />}
      <div className="w-[90%] mx-auto">
        <div className="text-left mt-3 ml-2 text-sm font-semibold text-gray-600">제목</div>
        <textarea name="content" placeholder="제목을 작성해주세요." className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">내용</div>
        <textarea name="content" placeholder="일정 / 장소를 이야기하면 동행을 더 빨리 찾을 수 있어요!" className="w-full h-36 text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">위치</div>
        <textarea name="content" placeholder="ex) 서울시 홍대입구역" className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">모집기간</div>
        <div className="flex items-center">
          <input type="date" id="dateInput1" value={selectedDate} onChange={handleDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
          <span className="mx-6">~</span>
          <input type="date" id="dateInput2" value={selectedDate} onChange={handleDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
        </div>
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">여행기간</div>
        <div className="flex items-center">
          <input type="date" id="dateInput1" value={selectedDate} onChange={handleDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
          <span className="mx-6">~</span>
          <input type="date" id="dateInput2" value={selectedDate} onChange={handleDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
        </div>
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">여행인원</div>
        <textarea name="content" placeholder="0명" className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
        <button className="absolute bottom-[80px] w-[90%] left-[50%] -translate-x-[50%] bg-main-color py-3 rounded-lg text-white text-lg font-extrabold" onClick={isOpen}>
          작성하기
        </button>
      </div>
    </div>
  );
};

export default WriteBoard;
