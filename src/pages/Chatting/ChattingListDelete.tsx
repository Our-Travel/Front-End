import React, { useState, useRef } from 'react';
import ChattingModal from '../../components/Modal/ChattingModal';
import ChattingHeader from '../../components/Header/ChattingHeader';
import ChattingItem from '../../components/Chatting/ChattingItem';
import ChattingEmpty from '../../components/Chatting/ChattingEmpty';
import Header from '../../components/Header/Header';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import ChattingItemDelete from './ChattingItemDelete';

// import CheckBox from './CheckBox';

const ChattingListDelete = () => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const icon = <BsTrash />;

  // const [checkedItems, setCheckedItems] = useState(new Set());
  // const checkedItemHandler = (id: number, isChecked: boolean) => {
  //   if (isChecked) {
  //     checkedItems.add(id);
  //     setCheckedItems(checkedItems);
  //   } else if (!isChecked && checkedItems.has(id)) {
  //     checkedItems.delete(id);
  //     setCheckedItems(checkedItems);
  //   }
  // };

  // const [bChecked, setChecked] = useState(false);
  // const checkHandler = ({ target }) => {
  //   setChecked(!bChecked);
  //   checkedItemHandler(issue.id, target.checked);
  // };

  return (
    <div className="">
      <Header title="채팅목록" back={true} icon={icon} />
      <div>{isEmpty ? <ChattingItemDelete /> : <ChattingEmpty />}</div>
    </div>
  );
};

export default ChattingListDelete;
