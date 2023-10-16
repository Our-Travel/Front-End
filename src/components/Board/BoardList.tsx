import { useState, useEffect } from 'react';
import BoardItem from './BoardItem';
import BoardModal from './BoardModal';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { boardItem } from '../../Atom/atom';
import EmptyPage from 'shared/EmptyPage';

interface BoardListProps {
  selectedButtonIndex: number;
  setSelectedButtonIndex: (index: number) => void;
}

const BoardList = ({ selectedButtonIndex, setSelectedButtonIndex }: BoardListProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [boardList, setBoardList] = useState([]);
  //BoardItem에서 클릭된 정보를 저장하기 위한 객체
  const setSelectedItem = useSetRecoilState<any>(boardItem);
  const [lastId, setLastId] = useState<any>(100);
  //받아온 데이터의 갯수가 없다면? 을 받는 객체
  const [isEmpty, setEmpty] = useState<boolean>(true);

  const handleItemClick = (index: number) => {
    setSelectedItem(boardList[index]);
    setModal(true);
  };

  //서버로 통신 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const getBoardList = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 여행 게시글 작성 요청
      const boardsUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/list?regionCode=${selectedButtonIndex}&lastId=${lastId}`;
      const response = await axios.get(boardsUrl, {
        headers: headers,
      });
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

  useEffect(() => {
    if (selectedButtonIndex !== 0) {
      getBoardList();
    }
  }, [selectedButtonIndex, modal]);

  return (
    <div>
      {isEmpty ? (
        <EmptyPage content={'NOWRITE'} subContent={'Writing_encouragement'} alt={'작성한 글이 없어요 페이지 보라색 캐릭터'} />
      ) : (
        <div>
          {boardList.map(({ profile_image_full_path, writer, title, like_counts, valid_writer }, index) => (
            <BoardItem key={index} writer={writer} title={title} profile_image_full_path={profile_image_full_path} like_counts={like_counts} onItemClick={() => handleItemClick(index)} content={''} valid_writer={valid_writer} />
          ))}
        </div>
      )}
      {modal && <BoardModal modal={modal} setModal={setModal} />}
    </div>
  );
};

export default BoardList;
