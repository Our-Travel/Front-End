import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

export function Profile() {
  return (
    <div className="flex flex-row items-center gap-3">
      <img src="/assets/profile.svg" alt="마이페이지 프로필사진 캐릭터" />
      <div className="text-left">
        <h2>닉네임</h2>
        <p className="mt-1">test@email.com</p>
      </div>
    </div>
  );
}

interface MyTab {
  name: string;
  link: string;
}

export function MypageTab({ name, link }: MyTab) {
  return (
    <Link to={link} className="flex flex-row justify-between items-center w-[25rem] h-14 text-lg">
      <p>{name}</p>
      <MdArrowForwardIos className="w-5 h-5" />
    </Link>
  );
}
