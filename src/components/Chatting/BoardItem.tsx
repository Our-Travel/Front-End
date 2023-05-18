import React from 'react';

interface BoardItemProps {
  nickName: string;
  content: string;
}
const BoardItem = ({ nickName, content }: BoardItemProps) => {
  return (
    <div className="relative flex h-[70px] bg-orange-200 my-2">
      <div className="absolute top-[50%] -translate-y-[50%] bg-slate-500 w-1/5">프로필사진</div>
      <div className="absolute right-0 w-4/5 top-[50%] -translate-y-[50%] bg-gray-200 text-left px-3">
        <div className="font-semibold">{nickName}</div>
        <div className="text-gray-600">{content}</div>
      </div>
    </div>
  );
};

export default BoardItem;
