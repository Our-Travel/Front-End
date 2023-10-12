import React from 'react';

interface ChattingComponentProps {
  writer: string;
  latest_message: string;
  time: string;
  room_title: string;
  image: string;
}

const ChattingComponenet = ({ writer, latest_message, time, room_title, image }: ChattingComponentProps) => {
  const date = time.split('T')[0];

  return (
    <li className="h-[100px] flex items-center px-[20px] py-[10px] border-b-[1px] hover:bg-gray-100">
      <img src={image || '/assets/profile.svg'} alt="프로필사진" className="w-1/6" />
      <div className="text-left ml-4">
        <p className="text-sm font-semibold flex flex-nowrap">
          {room_title}
          <span className="text-gray-500 text-xs ml-4 translate-y-[2px]">{date}</span>
        </p>
        <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">{`(${writer}) ${latest_message}`}</p>
      </div>
      <div className="absolute right-4">
        {/* <div className="">
          <p className="text-white bg-red-500 rounded-full font-semibold text-[14px] mt-[7px] mr-0 w-[21px] pr-0">1</p>
        </div> */}
      </div>
    </li>
  );
};

export default ChattingComponenet;
