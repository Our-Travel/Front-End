import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChattingComponentDelete from './ChattingComponentDelete';
import ChattingComponenetDelete from './ChattingComponentDelete';

const chat = [
  {
    nickName: '맷돌이',
    content: '혹시 프로젝트 통과하나요?',
    time: '14:15',
  },
  {
    nickName: '다시',
    content: '혹시 프로젝트 통과하나요?',
    time: '14:15',
  },
  {
    nickName: '지금까지',
    content: '혹시 프로젝트 통과하나요?',
    time: '14:15',
  },
];

const ChattingItemDelete = () => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const checkedItemHandler = (id: number, isChecked: boolean) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
      alert('체크됨');
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
      alert('해제됨');
    }
  };

  const [bChecked, setChecked] = useState(false);
  const checkHandler = (e: any) => {
    setChecked(!bChecked);
    checkedItemHandler(e.currentTarget.id, e.checked);
  };
  return (
    <div>
      {chat.map(({ nickName, content, time }, index) => (
        // <Link to={'/board/chatting'} key={index}>
        // <ChattingComponenetDelete key={index} nickName={nickName} content={content} time={time} />
        // </Link>
        <div className="relative" key={index}>
          <li className="h-[100px] flex items-center px-[20px] py-[10px] border-b-[1px] hover:bg-gray-100">
            <img src="/character.svg" alt="프로필사진" className="w-1/6" />
            <div className=" text-left ml-4">
              <p className="font-semibold flex flex-nowrap">
                {nickName}
                <span className="text-gray-500 text-[14px] ml-4 translate-y-[2px]">{time}</span>
              </p>
              <p className="mt-[7px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">{content}</p>
            </div>
            <div className="absolute right-4">
              <input type="checkbox" checked={bChecked} onChange={(e) => checkHandler(e)} />
            </div>
          </li>
        </div>
      ))}
    </div>
  );
};

export default ChattingItemDelete;
