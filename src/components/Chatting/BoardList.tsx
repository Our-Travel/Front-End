import React, { useState, useRef, SetStateAction, Dispatch, useEffect } from 'react';
import BoardItem from './BoardItem';
import BoardModal from './BoardModal';
import axios from 'axios';
import regions from './../../util/region';

interface BoardListProps {
  selectedButtonIndex: number; // 수정된 타입
  setSelectedButtonIndex: (index: number) => void;
}

const BoardList = ({ selectedButtonIndex, setSelectedButtonIndex }: BoardListProps) => {
  const [modal, setModal] = useState<boolean>(false);
  //BoardItem에서 클릭된 정보를 저장하기 위한 객체
  const [selectedItem, setSelectedItem] = useState<any>(null);
  //받아온 데이터의 갯수가 없다면? 을 받는 객체
  const [isEmpty, setEmpty] = useState<boolean>(true);

  let boardList: any[] = [];

  const boardData = {
    board_id: 1,
    title: '제목3입니다',
    content: '내용3입니다',
    region_code: 123455,
    number_of_travelers: 3,
    recruitment_period_start: '2030-08-01',
    recruitment_period_end: '2030-08-03',
    journey_period_start: '2030-08-04',
    journey_period_end: '2030-08-08',
    recruitment_status: 'UPCOMING',
    writer: '아아aaaaaa',
    valid_writer: true,
    like_board_status: false,
    like_counts: 3,
  };
  const anotherBoardData = {
    board_id: 2,
    title: '새로운 글입니다',
    content: '이것은 새로운 글의 내용입니다',
    region_code: 789012,
    number_of_travelers: 5,
    recruitment_period_start: '2030-09-01',
    recruitment_period_end: '2030-09-10',
    journey_period_start: '2030-09-15',
    journey_period_end: '2030-09-20',
    recruitment_status: 'RECRUITING',
    writer: '새로운 작성자',
    valid_writer: true,
    like_board_status: true,
    like_counts: 5,
  };
  // 기본 데이터를 boardList에 추가
  boardList.push(boardData, anotherBoardData);

  const handleItemClick = (index: number) => {
    setSelectedItem(boardList[index]);
    setModal(true);
  };

  return (
    <div>
      {isEmpty ? (
        <div>
          {boardList.map(({ writer, title, content, like_counts }, index) => (
            <BoardItem key={index} writer={writer} title={title} content={content} like_counts={like_counts} onItemClick={() => handleItemClick(index)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-9 absolute centerPosition w-full">
          <img src="/assets/MyWriteImg.svg" alt="작성한 글이 없어요 페이지 보라색 캐릭터" />
          <div>
            <p className="text-xl">작성된 글이 없어요.</p>
            <p className="mt-3 text-gray-500">글을 작성해 여행할 동료를 구해보세요.</p>
          </div>
        </div>
      )}
      {modal && <BoardModal setModal={setModal} item={selectedItem} />}
    </div>
  );
};

export default BoardList;
