import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { GoThumbsup } from 'react-icons/go';
import useLoginCheck from '../../hooks/useLoginCheck';

interface BoardItemProps {
  writer: string;
  title: string;
  content: string;
  like_counts: number;
  onItemClick: () => void;
}
const BoardItem = ({ writer, title, content, like_counts, onItemClick }: BoardItemProps) => {
  const handleClick = () => {
    onItemClick(); // 클릭 이벤트를 BoardList(상위) 컴포넌트로 전달
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      onItemClick();
    }
  };

  return (
    <div onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} className="relative flex h-[80px] hover:bg-gray-100 border-b-2 pb-24 px-2">
      <div className="absolute top-[50%] -translate-y-[50%] w-1/5 px-2">
        <p className="font-bold text-lg">{writer}</p>
      </div>
      <div className="absolute right-0 w-4/5 top-[50%] -translate-y-[50%]  text-left px-3">
        <div className=" font-semibold mr-10">{title}</div>
        <div className="text-gray-600  mr-10">{content}</div>
      </div>
      <p className="absolute flex right-2 top-[50%] -translate-y-[50%] text-gray-500 text-[14px]">
        <GoThumbsup className="translate-y-1/4 mr-1" />
        {like_counts}
      </p>
    </div>
  );
};

export default BoardItem;
