import { Link } from 'react-router-dom';
import Feedback from './Feedback';
import { useState } from 'react';

const ChoiceTab = () => {
  const [modal, setModal] = useState<boolean>(false);
  const openModal = () => {
    setModal(true);
  };
  return (
    <div className="flex felx-row items-center justify-center my-6 text-gray-500">
      {modal && <Feedback setModal={setModal} />}
      <button className="text-gray-500" onClick={openModal}>
        feedback
      </button>
      <span className="mx-5">|</span>
      <Link to="/signup" className="px-3">
        <span>회원가입</span>
      </Link>
      <span className="mx-5">|</span>
      <Link to="/main" className="px-3">
        <span>둘러보기</span>
      </Link>
    </div>
  );
};

export default ChoiceTab;
