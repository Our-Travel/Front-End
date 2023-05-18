import React, { useState, useRef } from 'react';
import PostHeader from '../../components/Header/PostHeader';
import PostModal from '../../components/Modal/PostModal';

const Post = () => {
  const [modalOpen, setModal] = useState<boolean>(false);

  const isOpen = () => setModal(!modalOpen);

  return (
    <div>
      <PostHeader title={'여행친구 구하기'} />
      <div>
        <ul>
          <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]" onClick={isOpen}>
            <img src="/profile1.svg" alt="프로필사진" className="w-[15%]" />
            <div className="w-[260px] text-left">
              <p className="font-semibold">sojupa</p>
              <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">5월 첫째주 같이 노실분 구합니다~</p>
            </div>
            <p className="text-gray-500 text-[14px]">04.23</p>
          </li>
          <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]">
            <img src="/profile2.svg" alt="프로필사진" className="w-[15%]" />
            <div className="w-[260px] text-left">
              <p className="font-semibold">dean</p>
              <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">5월 첫째주 같이 노실분 구합니다~</p>
            </div>
            <p className="text-gray-500 text-[14px]">04.23</p>
          </li>
          <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]">
            <img src="/profile3.svg" alt="프로필사진" className="w-[15%]" />
            <div className="w-[260px] text-left">
              <p className="font-semibold">daisy</p>
              <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">5월 첫째주 같이 노실분 구합니다~</p>
            </div>
            <p className="text-gray-500 text-[14px]">04.23</p>
          </li>
          <li className="h-[100px] flex justify-between items-center mx-[20px] py-[10px] border-b-[1px]">
            <img src="/profile4.svg" alt="프로필사진" className="w-[15%]" />
            <div className="w-[260px] text-left">
              <p className="font-semibold">cafebene</p>
              <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">5월 첫째주 같이 노실분 구합니다~</p>
            </div>
            <p className="text-gray-500 text-[14px]">04.23</p>
          </li>
        </ul>
      </div>
      <PostModal open={modalOpen} close={setModal} />
    </div>
  );
};

export default Post;
