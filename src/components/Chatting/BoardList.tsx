import React, { useState, useRef, SetStateAction, Dispatch, useEffect } from 'react';
import BoardItem from './BoardItem';
import BoardModal from './BoardModal';
import axios from 'axios';

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

  //모달로 뜨게될 게시글 하나의 상세정보를 불러오는 통신 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const boardId = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 여행 게시글 작성 요청
      const boardUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/1`;
      const response = await axios.post(boardUrl, {
        headers: headers,
      });
      alert('통신성공!');
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // 에러가 발생하면 해당 에러 메시지를 알림으로 보여줌
        alert(error.response.data.msg);
      } else {
        // 기타 에러 처리
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  useEffect(() => {
    boardId();
  }, []);

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
