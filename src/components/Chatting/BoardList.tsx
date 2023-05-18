import React from 'react';
import BoardItem from './BoardItem';

// BoardList는 게시판 리스트가 있는 컴포넌트로
// BoardItem 들을 호출해오는 곳입니다

const BoardList = () => {
  return (
    <div>
      이건 boardlist 밑에 BoardItem 추후에 맵으로 돌려야할 듯
      <BoardItem nickName={'nick'} content={'content test'} />
      <BoardItem nickName={'nick'} content={'content test'} />
      <BoardItem nickName={'nick'} content={'content test'} />
    </div>
  );
};

export default BoardList;
