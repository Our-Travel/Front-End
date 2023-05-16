import React from 'react';

const Chatting = () => {
  return (
    <div>
      <div className="bg-white h-screen w-[450px]">
        <div className="text-[#FF626F] pt-2 pb-2 text-sm">맷돌이님과 블루님이 채팅을 시작하였습니다.</div>
        <div className="main-chat">
          <div className="flex justify-start mt-2">
            <img src="/chattingProfile.svg" alt="채팅프로필사진" className="w-[12%] self-start" />
            <div className="flex flex-col ml-2 text-left">
              <span>맷돌이</span>
              <div className="mt-3">
                <span className="bg-[#F2F2F2] py-1 px-2 border border-solid border-[#F2F2F2] rounded-e-md rounded-bl-md">안녕하세요~!!</span>
              </div>
              <div className="mt-3">
                <span className="bg-[#F2F2F2]  py-1 px-2 border border-solid border-[#F2F2F2] rounded-e-md rounded-bl-md">혹시 교자만두 교환 끝났나요?</span>
              </div>
            </div>
            <time dateTime="07:30:00+09:00" className="self-end ml-2 text-sm text-[#999999]">
              오전 7:30
            </time>
          </div>

          <div className="flex flex-row-reverse justify-start mt-2">
            <div className="flex flex-col ml-2 text-left">
              <span className="bg-[#ff626f] mt-2 py-1 px-2 border border-solid border-[#ff626f] rounded-t-md rounded-bl-md text-white">아뇨! 비비고 교자만두 두개 남아있어요~!!</span>
            </div>
            <time dateTime="07:30:00+09:00" className="self-end ml-2 text-sm text-[#999999]">
              오전 7:30
            </time>
          </div>
        </div>
      </div>
      <div className="insert-box sticky bottom-0 h-14 flex">
        <input type="text" className="grow m-3 rounded bg-[#f2f2f2]" id="chattext" name="chatinput" placeholder="" />
        <button id="sendbtn">
          <img src="/sendButton.svg" alt="메세지 전송버튼" className="mr-3" />
        </button>
      </div>
    </div>
  );
};

export default Chatting;
