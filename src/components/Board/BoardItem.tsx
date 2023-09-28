import { loginType } from 'Atom/userAtom';
import React from 'react';
import { GoThumbsup } from 'react-icons/go';
import { useRecoilValue } from 'recoil';

interface BoardItemProps {
  writer: string;
  title: string;
  image_path: string;
  content: string;
  like_counts: number;
  onItemClick: () => void;
}
const BoardItem = ({ image_path, writer, title, like_counts, onItemClick }: BoardItemProps) => {
  const signType = useRecoilValue(loginType);
  const handleClick = () => {
    onItemClick(); // 클릭 이벤트를 BoardList(상위) 컴포넌트로 전달
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      onItemClick();
    }
  };

  return (
    <div onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} className="relative flex h-[80px] hover:bg-pink-50 border-b-2 pb-24 px-2">
      <div className="absolute top-[50%] -translate-y-[50%] w-1/5 px-2 overflow-hidden whitespace-nowrap">
        <img src={image_path || (signType ? '/assets/profileSocial.svg' : image_path)} className="w-30 h-30 rounded-full border border-gray-300" alt="마이페이지 프로필사진" />
      </div>
      <div className="absolute left-1/4 w-4/5 top-[50%] -translate-y-[50%] text-left px-3">
        <div className="font-semibold mr-10">{writer}</div>
        <div className="text-gray-600  mr-10">{title}</div>
      </div>
      <p className="absolute flex right-2 top-[50%] -translate-y-[50%] text-gray-500 text-[14px]">
        <GoThumbsup className="translate-y-1/4 mr-1" />
        {like_counts}
      </p>
    </div>
  );
};

export default BoardItem;
