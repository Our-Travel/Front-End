import Header from '../../components/Header/Header';
import { Profile } from '../../components/MypageInfo/MypageInfo';

export default function MyWrite() {
  return (
    <>
      <Header title={'내가 작성한 글'} back={false} icon={undefined} />
      <div className="flex flex-col gap-4 w-[25rem] mx-auto my-6 line">
        <Profile />
      </div>
      <div className="flex flex-col items-center justify-center gap-9 absolute centerPosition w-full">
        <img src="/assets/MyWriteImg.svg" alt="작성한 글이 없어요 페이지 보라색 캐릭터" />
        <div>
          <p className="text-xl">작성한 글이 없어요.</p>
          <p className="mt-3 text-gray-500">글을 작성해 여행할 동료를 구해보세요.</p>
        </div>
      </div>
    </>
  );
}
