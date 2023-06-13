import React, { Dispatch, SetStateAction, useRef } from 'react';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';

interface TourModalProps {
  // boardDetail: number | null;
  setModal: Dispatch<SetStateAction<boolean>>;
  post: {
    address_name: string;
    distance: number;
    id: number;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: number;
    y: number;
  } | null;
}
const TourModal = ({ setModal, post }: TourModalProps) => {
  console.log(post);
  const closeModal = () => {
    setModal(false);
  };
  const handleClipBoard = async () => {
    const text = document.getElementById('address')?.innerText;
    if (text && !document.hasFocus()) {
      await navigator.clipboard.writeText(text);
      alert('복사됐다');
    } else {
      alert('복사실패');
    }
  };
  return (
    <>
      {post && (
        <div className="shadow-2xl">
          <div onClick={closeModal} className="z-0 absolute w-full h-screen modalPosition bg-red-200 opacity-25" />
          <div className="absolute bottom-0 w-full h-[400px] bg-white rounded-t-3xl">
            <div className="border-b-2 py-3">중앙대학교</div>
            <div className="flex items-center border-b-2 py-10 pl-5 pr-10">
              <div className="w-[70px] h-[80px] bg-pink-300 p-2 rounded-lg mr-3">
                <img className="mr-6" alt="관광지 사진" src="/homeicon.png" />
              </div>
              <div className="flex flex-col items-start">
                <h1>{post.place_name}</h1>
                <p id="address">{post.address_name}</p>
                <p>{post.phone == '' ? <span>전화번호가 없습니다.</span> : <span>{post.phone}</span>}</p>
              </div>
            </div>
            <p className="pt-10 pb-16 text-left">여기에 뭐라고 써야할지 모르겠어 설명이 간지나게 적혀야할거 같은 느낌이 팍팍 든다</p>
            <div className="flex items-center justify-between px-5">
              <div className="flex items-center">
                <AiOutlineHeart className="mr-3 w-[30px] h-[30px]" />
                <span>Add To Favorite</span>
              </div>
              <div className="w-[1px] h-[30px] bg-black" />
              <div onClick={handleClipBoard} className="flex items-center">
                <AiOutlineShareAlt className="mr-3 w-[30px] h-[30px]" />
                <button>Share Location</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourModal;
