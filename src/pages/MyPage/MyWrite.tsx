import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';
import BoardItem from '../../components/Chatting/BoardItem';
import { useNavigate } from 'react-router-dom';

const data = [
  { nickName: 'name1', title: '5월에놀러가요', content: 'conetent1' },
  { nickName: 'name2', title: '6월에놀러가요', content: 'content2' },
  { nickName: 'tesfd3', title: '7월에놀러가요', content: 'content3' },
];
const MyWrite = () => {
  const navigate = useNavigate();
  //받아온 데이터의 갯수가 없다면? 을 받는 객체
  const [isEmpty, setEmpty] = useState<boolean>(true);
  //BoardItem에서 클릭된 정보를 저장하기 위한 객체
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(data[index]);
    navigate('/mypage/editBoard');
  };

  // 통신하고나서
  //const dataIsEmpty = data.length === 0;
  // isEmpty 상태 업데이트
  //setEmpty(dataIsEmpty);

  return (
    <>
      <Header title={'내가 작성한 글'} back={true} icon={''} />
      <div className="flex flex-col gap-4 my-6 line">
        <Profile />
      </div>
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
            <p className="text-xl">작성한 글이 없어요.</p>
            <p className="mt-3 text-gray-500">글을 작성해 여행할 동료를 구해보세요.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyWrite;
