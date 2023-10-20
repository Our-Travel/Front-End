import React, { useEffect, useState } from 'react';
import regions from 'util/region';

interface ChattingComponentProps {
  writer: string;
  latest_message: string;
  time: string;
  room_title: string;
  region_code: number;
  room_manager: string;
}

// host 채팅 테스트
const ChattingComponenet = ({ writer, latest_message, time, room_title, region_code, room_manager }: ChattingComponentProps) => {
  const [inputDate, setInputDate] = useState('');
  const [inputTime, setInputTime] = useState('');
  const foundRegion = regions.find((re) => re.value === region_code)?.key;

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
    <div className="w-full h-24 px-3 hover:bg-gray-100">
      <div className="translate-y-4 flex items-center justify-between">
        <div className="relative w-[15%] h-full">
          {room_manager ? (
            <div className="w-16 h-16 bg-main-color border-main-color4 border-2 text-white rounded-lg relative mr-3">
              <h1 className="font-bold w-full text-lg absolute centerPosition">{foundRegion}</h1>
            </div>
          ) : (
            <div className="w-16 h-16 bg-red-100 border-red-300 border-2 text-red-500 relative rounded-lg mr-3">
              <h1 className="font-bold w-full absolute centerPosition">HOST</h1>
            </div>
          )}
        </div>

        <div className="flex w-[calc(100%-5rem)] text-[clamp(10px,4vw,16px)] flex-col">
          <div className="flex justify-between w-full">
            <span className="text-sm text-left font-semibold flex flex-nowrap whitespace-pre-wrap">{room_manager ? `${room_manager}님의 단체방` : `${titleArr[0]}\n${titleArr[1]} ${titleArr[2]}`}</span>
            <span className="text-gray-500 text-4 ml-4 translate-y-1">{time !== null && inputDate}</span>
          </div>
          <div className="mt-2 flex whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">
            {writer ? <span className="font-bold mr-2 px-2 bg-main-color4 text-white rounded-sm">{writer !== null && `${writer + '님'}`}</span> : <></>}
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">{latest_message}</p>
          </div>
        </div>
        {/*새로운 알림시 */}
        {/* <div className="absolute right-8">
          <div className="w-3 h-3 animate-pulse bg-main-color2 rounded-full "></div>
        </div> */}
      </div>
    </div>
  );
};

export default ChattingComponenet;
