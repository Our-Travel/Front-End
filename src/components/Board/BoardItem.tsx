import { loginType } from 'Atom/userAtom';
import { useEffect, useState } from 'react';
import { GoThumbsup } from 'react-icons/go';
import { useRecoilValue } from 'recoil';

interface BoardItemProps {
  writer: string;
  title: string;
  profile_image_full_path: string;
  content: string;
  like_counts: number;
  onItemClick: () => void;
  valid_writer: boolean | null;
}
const BoardItem = ({ profile_image_full_path, writer, title, like_counts, onItemClick, valid_writer }: BoardItemProps) => {
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
      <div className="absolute top-[50%] -translate-y-[50%] w-24 px-2 overflow-hidden whitespace-nowrap">
        <img src={profile_image_full_path || (signType ? '/assets/profile.svg' : '/assets/profileSocial.svg')} className="w-full h-full rounded-full border border-gray-300" alt="프로필" />
      </div>
      <div className="absolute left-[30%] sm:left-1/4 top-[50%] -translate-y-[50%] text-left px-3">
        <div className="font-semibold mr-10">{writer}</div>
        <div className="text-gray-600  mr-10">{title}</div>
      </div>
      <p className="absolute flex right-6 top-[50%] -translate-y-[50%] text-gray-500 text-[14px]">
        <GoThumbsup className="translate-y-1/4 mr-1" />
        {like_counts}
      </p>
    </div>
  );
};

export default BoardItem;
