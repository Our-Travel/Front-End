import React, { Dispatch, SetStateAction } from 'react';
import regions from '../../util/region';

interface PostFormProps {
  title: string;
  content: string;
  location: number;
  gatherStartDate: string;
  gatherEndDate: string;
  TripStartDate: string;
  TripEndDate: string;
  travelers: number;
  onTitleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onGatherStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGatherEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTripStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTripEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTravelersChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const PostForm: React.FC<PostFormProps> = (props) => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="text-left mt-3 ml-2 text-sm font-semibold text-gray-600 ">제목</div>
      <textarea value={props.title} onChange={props.onTitleChange} name="content" placeholder="제목을 작성해주세요." className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
      <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">내용</div>
      <textarea
        value={props.content}
        onChange={props.onContentChange}
        name="content"
        placeholder="일정 / 장소를 이야기하면 동행을 더 빨리 찾을 수 있어요!"
        className="w-full h-36 text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400"
      />
      <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">여행할 지역</div>
      <select value={props.location} onChange={props.onLocationChange} className="text-gray-500 select select-bordered w-[100%] text-left text-sm font-semibold mt-2 py-2 px-3 border rounded-lg border-slate-400">
        <option value="option">여행할 지역을 선택해주세요</option>
        {regions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.key}
          </option>
        ))}
      </select>
      <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">모집기간</div>
      <div className="flex items-center">
        <input type="date" id="dateInput1" value={props.gatherStartDate} onChange={props.onGatherStartDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
        <span className="mx-6">~</span>
        <input type="date" id="dateInput2" value={props.gatherEndDate} onChange={props.onGatherEndDateChange} min={props.gatherStartDate} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
      </div>
      <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">여행기간</div>
      <div className="flex items-center">
        <input type="date" id="dateInput1" value={props.TripStartDate} onChange={props.onTripStartDateChange} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
        <span className="mx-6">~</span>
        <input type="date" id="dateInput2" value={props.TripEndDate} onChange={props.onTripEndDateChange} min={props.TripStartDate} className="w-1/2 mt-2 px-3 py-2 text-left border rounded-lg border-slate-400" />
      </div>
      <div className="text-left mt-2 ml-2 text-sm font-semibold text-gray-600">여행인원</div>
      <textarea value={props.travelers} onChange={props.onTravelersChange} name="content" placeholder="0" className="w-full h-10 overflow-hidden text-sm lg:text-base mt-2 px-3 py-2  border rounded-lg border-slate-400" />
      <button onClick={props.onSubmit} className="w-[90%] mt-4 mb-20  bg-main-color py-2 rounded-lg text-white text-lg font-extrabold">
        작성하기
      </button>
    </div>
  );
};
export default PostForm;
