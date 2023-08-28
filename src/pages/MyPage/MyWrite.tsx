import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import BoardItem from '../../components/Board/BoardItem';
import axios from 'axios';
import EditBoard from './EditBoard';

const MyWrite = () => {
  //받아온 데이터의 갯수가 없다면? 을 받는 객체
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const [boardList, setBoardList] = useState([]);
  const [close, setClose] = useState<boolean>(false);
  const [editBoard, setEditBoard] = useState<boolean>(false);
  //BoardItem에서 클릭된 정보를 저장하기 위한 객체
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    myBoards();
  }, []);

  //내가작성한 글 리스트 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const myBoards = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 내가 작성한 글 리스트 [주소확인 @@@@@@@@@@@@@]
      const boardUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/my`;
      const response = await axios.get(boardUrl, {
        headers: headers,
      });
      console.log(response.data.data.content);

      const data = response.data.data.content;
      setBoardList(data);
      const dataIsEmpty = response.data.data.content.length === 0;
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
        <div className="flex flex-col items-center justify-center gap-4 absolute centerPosition w-full">
          <img src="/assets/MyWriteImg.svg" alt="작성한 글이 없어요 페이지 보라색 캐릭터" />
          <div>
            <p className="text-xl">작성한 글이 없어요.</p>
            <p className="mt-3 text-gray-500">글을 작성해 여행할 동료를 구해보세요.</p>
          </div>
        </div>
      ) : (
        <>
          {boardList.map(({ writer, title, content, like_counts }, index) => (
            <BoardItem key={index} writer={writer} title={title} content={content} like_counts={like_counts} onItemClick={() => handleItemClick(index)} />
          ))}
        </>
      )}
    </>
  );
};

export default MyWrite;
