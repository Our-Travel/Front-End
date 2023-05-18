import React from 'react';

const ChattingItem = () => {
  return (
    <div>
      <ul>
        <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]">
          <img src="/character.svg" alt="프로필사진" className="w-[15%]" />
          <div className="w-[260px] text-left">
            <p className="font-semibold">맷돌이</p>
            <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">혹시 교자만두 교환 끝났나요?</p>
          </div>
          <div className="">
            <p className="text-gray-500 text-[14px]">오후 1:15</p>
            <div className="">
              <p className="text-white bg-red-500 rounded-full font-semibold text-[14px] mt-[7px] mr-0 w-[21px] pr-0">1</p>
            </div>
          </div>
        </li>
        <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]">
          <img src="/character.svg" alt="프로필사진" className="w-[15%]" />
          <div className="w-[260px] text-left">
            <p className="font-semibold">맷돌이</p>
            <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">혹시 교자만두 교환 끝났나요?</p>
          </div>
          <div className="">
            <p className="text-gray-500 text-[14px]">오후 1:15</p>
            <p className="text-white bg-red-500 rounded-full font-semibold text-[14px] mt-[7px] mr-0 w-[21px] pr-0">1</p>
          </div>
        </li>
        <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]">
          <img src="/character.svg" alt="프로필사진" className="w-[15%]" />
          <div className="w-[260px] text-left">
            <p className="font-semibold">맷돌이</p>
            <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">혹시 교자만두 교환 끝났나요?</p>
          </div>
          <div className="">
            <p className="text-gray-500 text-[14px]">오후 1:15</p>
            <p className="text-white bg-red-500 rounded-full font-semibold text-[14px] mt-[7px] mr-0 w-[21px] pr-0">1</p>
          </div>
        </li>
        <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]">
          <img src="/character.svg" alt="프로필사진" className="w-[15%]" />
          <div className="w-[260px] text-left">
            <p className="font-semibold">맷돌이</p>
            <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">혹시 교자만두 교환 끝났나요?</p>
          </div>
          <div className="">
            <p className="text-gray-500 text-[14px]">오후 1:15</p>
            <p className="text-white bg-red-500 rounded-full font-semibold text-[14px] mt-[7px] mr-0 w-[21px] pr-0">1</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ChattingItem;