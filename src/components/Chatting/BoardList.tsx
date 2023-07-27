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
  //받아온 데이터의 갯수가 없다면? 을 받는 객체
  const [isEmpty, setEmpty] = useState<boolean>(true);

  const handleItemClick = (index: number) => {
    setSelectedItem(data[index]);
    setModal(true);
  };

  //서버와 통신하여 selectedButtonIndex에 맞는 (즉 지역에맞는) data를 요청하고
  //그에대한 응답으로온 data를 돌리는 형식으로 진행
  // 받아온 데이터의 갯수가 1이상? isEmpty(true) 0이다? false

  return (
    <div>
      {isEmpty ? (
        <>
          {data.map(({ nickName, title, content }, index) => (
            <BoardItem key={index} nickName={nickName} title={title} content={content} onItemClick={() => handleItemClick(index)} />
          ))}
        </>
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
