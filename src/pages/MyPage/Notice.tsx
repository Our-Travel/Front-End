import Header from '../../components/Header/Header';
import { useState } from 'react';
import { langConvert } from 'Atom/atom';
import { useRecoilValue } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';

interface listInfo {
  title: string;
  date: Date;
  data: string;
}

const noticeList: listInfo[] = [
  {
    title: 'OT(Our Travel) 서버점검 [2023.05]',
    date: new Date(),
    data: '안녕하세요. OT입니다. 보다 나은 서비스를 제공하기 위해 사이트 안정화 및 서버 점검 작업을 진행하게 되어 안내해 드립니다. 작업 일시 : 2023년 01월 12일(목) 05:00 ~ 07:00 (2시간) 작업 내용 : OT 서버 점검 작업 영향 : OT 사이트 이용제한 * 점검시간은 공지보다 다소 길어질 수 있습니다. 서비스 이용에 불편을 끼쳐 대단히 죄송합니다. 더욱 편리하고 안정적인 서비스를 제공해 드리기 위해 최선을 다하는 OT이 되겠습니다. 감사합니다. 더욱 편리하고 안정적인 서비스를 제공해 드리기 위해 최선을 다하는 OT이 되겠습니다. 감사합니다. 더욱 편리하고 안정적인 서비스를 제공해 드리기 위해 최선을 다하는 OT가 되겠습니다. 감사합니다.',
  },
  {
    title: 'OT(Our Travel) 공지사항 오류 수정',
    date: new Date(),
    data: '안녕하세요. OT입니다. 보다 나은 서비스를 제공하기 위해 공지사항 무슨무슨 오류를 수정 하였습니다. 더욱 편리하고 안정적인 서비스를 제공해 드리기 위해 최선을 다하는 OT가 되겠습니다. 감사합니다.',
  },
  {
    title: 'OT(Our Travel) 5월 이벤트',
    date: new Date(),
    data: '안녕하세요. OT입니다. 5월 이벤트를 시작하오니 많은 관심 부탁드립니다.',
  },
];

const Notice = () => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const [listNumber, setListNumber] = useState<number | null>(null);

  const clickAccordion = (index: number) => {
    setListNumber(listNumber === index ? null : index);
  };

  return (
    <>
      <Header title={m('NOTICE')} back={true} icon={''} />
      <ul>
        {noticeList.map(({ title, date, data }, index) => (
          <li key={index} className={`flex flex-col justify-center text-left hover:bg-gray-200 cursor-pointer line ${listNumber === index ? 'bg-gray-200' : ''}`} onClick={() => clickAccordion(index)}>
            <div className="flex flex-col justify-center h-24 gap-2 px-3">
              <h2 className="text-lg">{title}</h2>
              <p className="text-gray-500">{`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}</p>
            </div>
            <p className={`overflow-hidden max-h-0 leading-8 px-3 bg-white cursor-default ${listNumber === index ? 'max-h-80 transition-[max-height] duration-700 ease-in' : 'transition-[max-height] duration-500'}`}>{data}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notice;
