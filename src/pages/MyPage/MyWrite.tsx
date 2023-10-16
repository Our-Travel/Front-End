import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import BoardItem from '../../components/Board/BoardItem';
import axios from 'axios';
import EditBoard from './EditBoard';
import EmptyPage from 'shared/EmptyPage';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

const MyWrite = () => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
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
      <Header title={m('WRITTEN_BY_ME')} back={true} icon={''} />
      {editBoard && <EditBoard setEditBoard={setEditBoard} item={selectedItem} />}
      {isEmpty ? (
        <EmptyPage content={'작성된 글이 없어요.'} subContent={'글을 작성해 여행할 동료를 구해보세요.'} alt={'작성한 글이 없어요 페이지 보라색 캐릭터'} />
      ) : (
        <>
          {boardList.map(({ writer, title, profile_image_full_path, like_counts }, index) => (
            <BoardItem key={index} writer={writer} title={title} profile_image_full_path={profile_image_full_path} like_counts={like_counts} onItemClick={() => handleItemClick(index)} content={''} valid_writer={null} />
          ))}
        </>
      )}
    </>
  );
};

export default MyWrite;
