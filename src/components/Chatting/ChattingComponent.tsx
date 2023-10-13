import React, { useEffect, useState } from 'react';
import regions from 'util/region';
import { useSetRecoilState } from 'recoil';
import { profileImage } from 'Atom/userAtom';

interface ChattingComponentProps {
  writer: string;
  latest_message: string;
  time: string;
  room_title: string;
  region_code: number;
  room_manager: string;
  image: string;
}

// host 채팅 테스트
const ChattingComponenet = ({ writer, latest_message, time, room_title, region_code, room_manager, image }: ChattingComponentProps) => {
  const [inputDate, setInputDate] = useState('');
  const [inputTime, setInputTime] = useState('');
  console.log(inputTime);
  const foundRegion = regions.find((re) => re.value === region_code)?.key;
  // 일대일 채팅 상대방 이미지 저장
  const setFriendImage = useSetRecoilState(profileImage);
  setFriendImage(image);

  console.log(region_code);

  useEffect(() => {
    const dateTime = new Date(time);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const extractedDate = `${year}-${month}-${day}`;
    const extractedTime = `${hours}:${minutes}`;

    setInputDate(extractedDate);
    setInputTime(extractedTime);
  }, [time]);

  const titleArr = room_title.split(' ');

  return (
    <div className="h-[100px] flex items-center justify-between pl-3 hover:bg-gray-100">
      {room_manager ? (
        <div className="bg-main-color border-main-color4 border-2 text-white rounded-lg p-[23px] relative mr-3">
          <h1 className="font-bold w-full text-lg absolute centerPosition">{foundRegion}</h1>
        </div>
      ) : (
        <div className="w-[50px] mr-3">
          <img src={image || '/assets/profile.svg'} alt="host채팅 상대방 유저 프로필 이미지" />
        </div>
      )}
      <div className="flex w-[330px] flex-col">
        <div className="flex justify-between w-full">
          <span className="text-sm text-left font-semibold flex flex-nowrap">
            {titleArr[0]} <br /> {titleArr[1]} {titleArr[2]}
          </span>
          <span className="text-gray-500 text-[14px] ml-4 translate-y-[2px]">{time !== null && inputDate}</span>
        </div>
        <div className="mt-[7px] flex whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">
          {writer ? <span className="font-bold mr-2 px-2 bg-main-color4 text-white rounded-sm">{writer !== null && `${writer + '님'}`}</span> : <></>}
          {latest_message}
        </div>
      </div>

      <div className="absolute right-8">
        <div className="w-[12px] h-[12px] animate-pulse bg-main-color2 rounded-full "></div>
      </div>
    </div>
  );
};

export default ChattingComponenet;
