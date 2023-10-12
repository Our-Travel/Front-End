import React from 'react';

interface ChattingComponentProps {
  content: string;
}

const MeChat = ({ content }: ChattingComponentProps) => {
  return (
    <div className="me-chat flex flex-row-reverse justify-start mt-2">
      <div className="flex flex-col ml-2 text-left">
        <span className="bg-[#ff626f] mt-2 py-1 px-2 border border-solid border-[#ff626f] rounded-t-md rounded-bl-md text-white">{content}</span>
      </div>
      <time dateTime="07:30:00+09:00" className="self-end ml-2 text-sm text-[#999999]">
        오전 7:30
      </time>
    </div>
  );
};

export default MeChat;
