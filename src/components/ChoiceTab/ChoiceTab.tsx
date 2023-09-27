import { Link } from 'react-router-dom';

const tabList = [
  { to: '/signup', name: '회원가입' },
  { to: '/', name: 'feedback' },
  { to: '/main', name: '둘러보기' },
];

const ChoiceTab = () => {
  return (
    <>
      {tabList.map(({ to, name }, index) => (
        <div key={index} className="flex felx-row items-center justify-center my-6 text-gray-500">
          <Link to={to} className="px-2">
            {name}
          </Link>
          {index !== tabList.length - 1 && <span className="mx-4">|</span>}
        </div>
      ))}
    </>
  );
};

export default ChoiceTab;
