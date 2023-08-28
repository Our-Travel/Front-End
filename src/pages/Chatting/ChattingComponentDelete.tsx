import React from 'react';

interface ChattingComponentProps {
  nickName: string;
  content: string;
  time: string;
  // isCheckbox: boolean;
}

const ChattingComponenetDelete = ({ nickName, content, time }: ChattingComponentProps) => {
  return (
    <div className="relative">
      <li className="h-[100px] flex items-center px-[20px] py-[10px] border-b-[1px] hover:bg-gray-100">
        <img src="/character.svg" alt="프로필사진" className="w-1/6" />
        <div className=" text-left ml-4">
          <p className="font-semibold flex flex-nowrap">
            {nickName}
            <span className="text-gray-500 text-[14px] ml-4 translate-y-[2px]">{time}</span>
          </p>
          <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">{content}</p>
        </div>
        <div className="absolute right-4">
          <input type="checkbox" />
        </div>
      </li>
    </div>
  );
};

export default ChattingComponenetDelete;
