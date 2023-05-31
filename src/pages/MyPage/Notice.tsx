import Header from '../../components/Header/Header';
import { useState } from 'react';

interface listInfo {
  title: string;
  date: Date;
  data: string;
}

const Notice = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [list, setList] = useState<listInfo[]>([
    {
      title: 'OT(Our Travel) 서버점검 [2023.05]',
      date: new Date(),
      data: '안녕하세요. 동행입니다. 보다 나은 서비스를 제공하기 위해 사이트 안정화 및 서버 점검 작업을 진행하게 되어 안내해 드립니다. 작업 일시 : 2023년 01월 12일(목) 05:00 ~ 07:00 (2시간) 작업 내용 : 동행 서버 점검 작업 영향 : 동행 사이트 이용제한 * 점검시간은 공지보다 다소 길어질 수 있습니다. 서비스 이용에 불편을 끼쳐 대단히 죄송합니다. 더욱 편리하고 안정적인 서비스를 제공해 드리기 위해 최선을 다하는 동행이 되겠습니다. 감사합니다.',
    },
    {
      title: 'OT(Our Travel) 공지사항 오류 수정',
      date: new Date(),
      data: '안녕하세요. 동행입니다. 보다 나은 서비스를 제공하기 위해 공지사항 무슨무슨 오류를 수정 하였습니다. 더욱 편리하고 안정적인 서비스를 제공해 드리기 위해 최선을 다하는 동행이 되겠습니다. 감사합니다.',
    },
    {
      title: '[우리의 여행] 5월 이벤트',
      date: new Date(),
      data: '안녕하세요. 동행입니다. 5월 이벤트를 시작하오니 많은 관심 부탁드립니다.',
    },
  ]);
  const [listNumber, setListNumber] = useState<number | null>(null);

  const clickAccordion = (index: number) => {
    setListNumber(listNumber === index ? null : index);
  };

  return (
    <>
      <Header title={'공지사항'} />
      <ul>
        {list.map(({ title, date, data }, index) => (
          <li key={index} className={`flex flex-col justify-center text-left h-auto hover:bg-red-50 cursor-pointer line ${listNumber === index ? 'bg-red-50' : ''}`} onClick={() => clickAccordion(index)}>
            <div className="flex flex-col justify-center h-24 gap-2 px-3">
              <h2 className="text-lg">{title}</h2>
              <p className="text-gray-500">{`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}</p>
            </div>
            {listNumber === index && <p className="h-auto p-3 leading-8 bg-white">{data}</p>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notice;
