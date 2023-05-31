import { SlArrowLeft } from 'react-icons/sl';

interface header {
  title: string;
}

const Header = ({ title }: header) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <header className="flex justify-center items-center text-2xl py-3 border-b border-gray-200">
      <button type="button" className="absolute left-1 px-2 py-2" onClick={handleGoBack}>
        <SlArrowLeft />
      </button>
      <h2>{title}</h2>
    </header>
  );
};

export default Header;
