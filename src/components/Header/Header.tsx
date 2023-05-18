import { SlArrowLeft } from 'react-icons/sl';

interface header {
  title: string;
  showButton: boolean;
}

export default function Header({ title, showButton }: header) {
  return (
    <header className="flex justify-center items-center text-2xl py-3 border-b border-gray-200">
      {showButton && (
        <button type="button" className="absolute left-1 px-2 py-2">
          <SlArrowLeft />
        </button>
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
    </header>
  );
}
