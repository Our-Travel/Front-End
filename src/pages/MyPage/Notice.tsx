import Header from '../../components/Header/Header';

const listTest: { title: string; date: Date }[] = [
  {
    title: 'OT(Our Travel) 서버점검 [2023.05]',
    date: new Date(),
  },
  {
    title: 'OT(Our Travel) 공지사항 오류 수정',
    date: new Date(),
  },
  {
    title: '[우리의 여행] 5월 이벤트',
    date: new Date(),
  },
];

export default function Notice() {
  return (
    <>
      <Header title={'공지사항'} showButton={true} />
      <ul>
        {listTest.map(({ title, date }, index) => (
          <li key={index} className="flex flex-col justify-center text-left h-24 hover:bg-gray-100 cursor-pointer line">
            <div className="flex flex-col justify-center h-full gap-2 px-3">
              <h2 className="text-lg">{title}</h2>
              <p className="text-gray-500">{`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
