import React, { useEffect, useState } from 'react';

interface ChattingComponentProps {
  content: string;
  time: string;
}

const MeChat = ({ content, time }: ChattingComponentProps) => {
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
    <div className="me-chat flex flex-row-reverse justify-start mt-2">
      <div className="flex flex-col ml-2 text-left">
        <span className="bg-[#ff626f] mt-2 py-1 px-2 border border-solid border-[#ff626f] rounded-t-md rounded-bl-md text-white">{content}</span>
      </div>
      <time dateTime={time} className="self-end ml-2 text-sm text-[#999999]">
        <span className="mr-1">{hour >= 12 ? '오후' : '오전'}</span>
        {dateTime}
      </time>
    </div>
  );
};

export default MeChat;
