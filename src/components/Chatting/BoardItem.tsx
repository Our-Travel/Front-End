import React from 'react';

interface BoardItemProps {
  nickName: string;
  content: string;
}
const BoardItem = ({ nickName, content }: BoardItemProps) => {
  return (
    <div className="relative flex h-[80px] my-2 hover:bg-gray-100">
      <div className="absolute top-[50%] -translate-y-[50%]  w-1/5 px-2">
        <img src="/profile1.svg" alt="프로필사진" className="w-full object-cover" />
      </div>
      <div className="absolute right-0 w-4/5 top-[50%] -translate-y-[50%] bg-gray-200 text-left px-3">
        <div className="font-semibold">{nickName}</div>
        <div className="text-gray-600">{content}</div>
      </div>
      <p className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-500 text-[14px]">04.23</p>
    </div>
  );
};

export default BoardItem;
