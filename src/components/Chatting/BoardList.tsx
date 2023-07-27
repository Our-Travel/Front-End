import React, { useState, useRef, SetStateAction, Dispatch, useEffect } from 'react';
import BoardItem from './BoardItem';
import BoardModal from './BoardModal';
import useLoginCheck from '../../hooks/useLoginCheck';

//앞으로 해야하는 작업이 Board.tsx에서 넘어온 지역필터를 통해서 그에맞는 data들을 map으로 돌려야함.
// Board.tsx에서 서울로 설정되었다면, 현재 페이지에서 서울관련 데이터를 요청. 뿌리기
//현재는 더미데이터 (data) 가 경기도 일때만 뜨게 해뒀음

interface BoardListProps {
  selectedButtonIndex: number; // 수정된 타입
  setSelectedButtonIndex: (index: number) => void;
}

const data = [
  { nickName: 'name1', title: '5월에놀러가요', content: 'conetent1' },
  { nickName: 'name2', title: '6월에놀러가요', content: 'content2' },
  { nickName: 'tesfd3', title: '7월에놀러가요', content: 'content3' },
];

const BoardList = ({ selectedButtonIndex, setSelectedButtonIndex }: BoardListProps) => {
  const [modal, setModal] = useState<boolean>(false);
  //BoardItem에서 클릭된 정보를 저장하기 위한 객체
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(data[index]);
    setModal(true);
  };

  return (
    <div>
      {selectedButtonIndex === 1 && ( // selectedButtonIndex가 1일 때만 데이터를 렌더링
        <>
          {data.map(({ nickName, title, content }, index) => (
            <BoardItem key={index} nickName={nickName} title={title} content={content} onItemClick={() => handleItemClick(index)} />
          ))}
        </>
      )}
      {modal && <BoardModal setModal={setModal} item={selectedItem} />}
    </div>
  );
};

export default BoardList;
