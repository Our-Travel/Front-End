import React, { ChangeEvent, useState } from 'react';
import Header from '../../components/Header/Header';
import WriteButton from '../../components/Chatting/WriteButton';

const WriteBoard = () => {
  const [modal, setModal] = useState<boolean>(false);

  //제목, 내용, 위치
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  //모집기간 설정
  const [gatherStartDate, setGatherStartDate] = useState<string>('');
  const [gatherEndDate, setGatherEndDate] = useState<string>('');
  //여행기간설정
  const [TripStartDate, setTripStartDate] = useState<string>('');
  const [TripEndDate, setTripEndDate] = useState<string>('');
  //여행인원
  const [travelers, setTravelers] = useState('');

  //모집기간
  const handleGatherStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGatherStartDate(event.target.value);
  };
  const handleGatherEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGatherEndDate(event.target.value);
  };
  //여행기간
  const handleTripStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTripStartDate(event.target.value);
  };
  const handleTripEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTripEndDate(event.target.value);
  };

  const writeCheck = () => {
    if (!gatherStartDate.trim() || !gatherEndDate.trim() || !TripStartDate.trim() || !TripEndDate.trim() || !travelers.trim()) {
      alert('입력되지 않은 부분이 있습니다. 모든 영역을 채워주세요.');
    } else {
      setModal(true);
    }
  };

  return (
    <div className="relative h-[100vh]">
      <Header title="게시글 작성" back={true} icon={''} />
      {modal && <WriteButton setModal={setModal} />}
      <div className="w-[90%] mx-auto">
        <div className="text-left mt-3 ml-2 text-sm font-semibold text-gray-600">제목</div>
        <textarea value={title} onChange={(e) => setTitle(e.target.value)} name="content" placeholder="제목을 작성해주세요." className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">내용</div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="content"
          placeholder="일정 / 장소를 이야기하면 동행을 더 빨리 찾을 수 있어요!"
          className="w-full h-36 text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400"
        />
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">위치</div>
        <textarea value={location} onChange={(e) => setLocation(e.target.value)} name="content" placeholder="ex) 서울시 홍대입구역" className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">모집기간</div>
        <div className="flex items-center">
          <input type="date" id="dateInput1" value={gatherStartDate} onChange={handleGatherStartDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
          <span className="mx-6">~</span>
          <input type="date" id="dateInput2" value={gatherEndDate} onChange={handleGatherEndDateChange} min={gatherStartDate} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
        </div>
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">여행기간</div>
        <div className="flex items-center">
          <input type="date" id="dateInput1" value={TripStartDate} onChange={handleTripStartDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
          <span className="mx-6">~</span>
          <input type="date" id="dateInput2" value={TripEndDate} onChange={handleTripEndDateChange} min={TripStartDate} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
        </div>
        <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">여행인원</div>
        <textarea value={travelers} onChange={(e) => setTravelers(e.target.value)} name="content" placeholder="0" className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
        <button onClick={writeCheck} className="absolute bottom-[80px] w-[90%] left-[50%] -translate-x-[50%] bg-main-color py-3 rounded-lg text-white text-lg font-extrabold">
          작성하기
        </button>
      </div>
    </div>
  );
};

export default WriteBoard;
