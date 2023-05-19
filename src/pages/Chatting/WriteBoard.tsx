import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import WriteButton from '../../components/Chatting/WriteButton';

const WriteBoard = () => {
  const [WriteModalOpen, setWriteModalOpen] = useState(false);

  return (
    <div className="relative bg-slate-300 h-[100vh]">
      <Header title="게시글 작성" back={true} icon={''} />
      {WriteModalOpen && <WriteButton open={setWriteModalOpen} close={''} />}
      <textarea name="content" placeholder="일정 / 장소를 이야기하면 동행을 더 빨리 찾을 수 있어요!" className="w-[90%] h-[50vh] text-sm lg:text-base mt-4 px-4 py-4  border rounded-xl border-slate-400" />
      <button className="absolute bottom-[80px] w-[90%] left-[50%] -translate-x-[50%] bg-main-color py-3 rounded-xl text-white text-lg font-extrabold" onClick={showWriteModal}>
        작성하기
      </button>
    </div>
  );
};

export default WriteBoard;
