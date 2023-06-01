import { Link } from 'react-router-dom';

const ChoiceTab = () => {
  return (
    <div className="flex felx-row items-center justify-center my-6 text-gray-500">
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
