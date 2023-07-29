import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import BoardItem from '../../components/Chatting/BoardItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditBoard from './EditBoard';

const MyWrite = () => {
  const navigate = useNavigate();
  //받아온 데이터의 갯수가 없다면? 을 받는 객체
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);
  const [editBoard, setEditBoard] = useState<boolean>(false);
  //BoardItem에서 클릭된 정보를 저장하기 위한 객체
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    myBoards();
  }, []);

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
    like_counts: 0,
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
    like_board_status: false,
    like_counts: 0,
  };
  // 기본 데이터를 boardList에 추가
  boardList.push(boardData, anotherBoardData);

  //내가작성한 글 리스트 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const myBoards = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 내가 작성한 글 리스트 주소확인 @@@@@@@@@@@@@
      const boardUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/1`;
      const response = await axios.get(boardUrl, {
        headers: headers,
      });

      console.log(response.data); //리스트형태로 내 글들이 떠야함
      boardList.push(response.data.content);
      //받아온 내 게시글 갯수가 0 이면 Empty 활성화
      const dataIsEmpty = boardList.length != 0;
      setEmpty(dataIsEmpty);
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

  const handleItemClick = (index: number) => {
    setSelectedItem(boardList[index]);
    setEditBoard(true);
  };

  return (
    <>
      <Header title={'내가 작성한 글'} back={true} icon={''} />
      {editBoard && <EditBoard setEditBoard={setEditBoard} item={selectedItem} />}
      {isEmpty ? (
        <>
          {boardList.map(({ writer, title, content }, index) => (
            <BoardItem key={index} writer={writer} title={title} content={content} onItemClick={() => handleItemClick(index)} />
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-9 absolute centerPosition w-full">
          <img src="/assets/MyWriteImg.svg" alt="작성한 글이 없어요 페이지 보라색 캐릭터" />
          <div>
            <p className="text-xl">작성한 글이 없어요.</p>
            <p className="mt-3 text-gray-500">글을 작성해 여행할 동료를 구해보세요.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyWrite;
