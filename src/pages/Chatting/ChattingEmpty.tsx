import React from 'react';
import PostHeader from '../../components/Header/PostHeader';

const ChattingEmpty = () => {
  return (
    <>
      <PostHeader title={'여행친구 구하기'} />
      <div className="flex items-center justify-center flex-col my-[50%]">
        <img src="/character2.svg" alt="캐릭터사진" className="mx-auto my-0 animate-bounce " />
        <p className="mt-6 text-lg font-bold">시작한 채팅이 없어요</p>
        <p className="mt-3 text-sm font-normal">새로운 채팅을 시작해 보세요</p>
      </div>
    </>
  );
};

export default ChattingEmpty;
