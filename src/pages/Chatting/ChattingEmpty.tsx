import React from 'react';

const ChattingEmpty = () => {
  return (
    <div className="bg-white h-screen w-[450px] flex items-center justify-center flex-col">
      <img src="/character2.svg" alt="캐릭터사진" className="mx-auto my-0 animate-bounce " />
      <p className="mt-6 text-lg font-bold">시작한 채팅이 없어요</p>
      <p className="mt-3 text-sm font-normal">새로운 채팅을 시작해 보세요</p>
    </div>
  );
};

export default ChattingEmpty;
