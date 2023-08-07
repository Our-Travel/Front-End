import React from 'react';

interface ChattingComponentProps {
  nickName: string;
  // content: string;
  // time: string;
}

const FriendChat = ({ nickName }: ChattingComponentProps) => {
  return (
    <div className="friend-chat flex justify-start mt-2">
      <img src="/chattingProfile.svg" alt="채팅프로필사진" className="w-[12%] self-start" />
      <div className="flex flex-col ml-2 text-left">
        <span>{nickName}</span>
        <div className="mt-3">
          <span className="bg-[#F2F2F2] py-1 px-2 border border-solid border-[#F2F2F2] rounded-e-md rounded-bl-md">안녕하세요~!!</span>
        </div>
        <div className="mt-3">
          <span className="bg-[#F2F2F2]  py-1 px-2 border border-solid border-[#F2F2F2] rounded-e-md rounded-bl-md">혹시 교자만두 교환 끝났나요?</span>
        </div>
      </div>
      <time dateTime="07:30:00+09:00" className="self-end ml-2 text-sm text-[#999999]">
        오후 1:47
      </time>
    </div>
  );
};

export default FriendChat;
