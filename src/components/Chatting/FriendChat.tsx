import React, { useEffect, useState } from 'react';

interface ChattingComponentProps {
  nickName: string;
  content: string;
  time: string;
}

const FriendChat = ({ nickName, content, time }: ChattingComponentProps) => {
  const [dateTime, setDateTime] = useState('');
  const [hour, setHour] = useState<number>(0);

  useEffect(() => {
    const dateTime = new Date(time);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const convertHours = hour < 10 ? '0' + hour : hour;
    const converMinutes = minutes < 10 ? '0' + minutes : minutes;

    const extractedDate = `${convertHours}:${converMinutes}`;
    setHour(hours);
    setDateTime(extractedDate);
  }, [content, time]);
  return (
    <div className="friend-chat flex justify-start mt-2">
      <img src="/assets/chattingProfile.svg" alt="채팅프로필사진" className="w-[12%] self-start" />
      <div className="flex flex-col ml-2 text-left">
        <span>{nickName}</span>
        <div className="mt-3">
          <span className="bg-[#F2F2F2] py-1 px-2 border border-solid border-[#F2F2F2] rounded-e-md rounded-bl-md">{content}</span>
        </div>
      </div>
      <time dateTime={time} className="self-end ml-2 text-sm text-[#999999]">
        <span className="mr-1">{hour >= 12 ? '오후' : '오전'}</span>
        {dateTime}
      </time>
    </div>
  );
};

export default FriendChat;
