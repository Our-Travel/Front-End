import { BsChatText } from 'react-icons/bs';
import { SlArrowLeft } from 'react-icons/sl';

interface postheader {
  title: string;
}

export default function Header({ title }: postheader) {
  return (
    <header className="flex justify-center items-center text-2xl py-3 border-b border-gray-200">
      {/* <button type="button" className="absolute left-1 px-2 py-2">
        <SlArrowLeft />
      </button> */}
      <h2>{title}</h2>
      <button type="button" className="absolute right-1 px-2 py-2">
        <BsChatText />
      </button>
    </header>
  );
}
