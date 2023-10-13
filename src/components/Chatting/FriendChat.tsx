import React from 'react';
import { profileImage } from 'Atom/userAtom';
import { useRecoilValue } from 'recoil';

interface ChattingComponentProps {
  nickName: string;
  content: string;
}

const FriendChat = ({ nickName, content }: ChattingComponentProps) => {
  const friendImage = useRecoilValue(profileImage);

  return (
    <div className="friend-chat flex justify-start mt-2">
      <img src={friendImage ? friendImage : '/assets/profile.svg'} alt="채팅프로필사진" className="w-[12%] self-start" />
      <div className="flex flex-col ml-2 text-left">
        <span>{nickName}</span>
        <div className="mt-3">
          <span className="bg-[#F2F2F2] py-1 px-2 border border-solid border-[#F2F2F2] rounded-e-md rounded-bl-md">{content}</span>
        </div>
      </div>
      <time dateTime="07:30:00+09:00" className="self-end ml-2 text-sm text-[#999999]">
        오후 1:47
      </time>
    </div>
  );
};

export default FriendChat;
