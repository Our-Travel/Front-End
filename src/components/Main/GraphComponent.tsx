import { useEffect, useState } from 'react';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { SlLocationPin } from 'react-icons/sl';
import addressGetter from '../../hooks/addressGetter';
import { visitor } from 'util/visitor';
import { convertAddressToKey } from 'util/convertAddress';
import SelectArea from './SelectArea';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';
import Spinner from 'shared/Spinner';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraphComponent() {
  const address = addressGetter();
  const area = convertAddressToKey(address ? address : '서울');
  const [geoArea, setGeoArea] = useState('');
  const [location, setLocation] = useState('');
  const [selectArea, setSelectArea] = useState('');
  const [minValue, setMinValue] = useState(Number);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const isOpen = () => setOpenModal(!openModal);
  const { numToKorean } = require('num-to-korean');
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: '월',
        data: [],
        borderColor: '#FF928A',
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    setGeoArea(area);
    setLocation(geoArea);
    openGraph();
  }, [area, geoArea]);

  useEffect(() => {
    if (selectArea) {
      setGeoArea(selectArea);
      setLocation(selectArea);
      openGraph();
    }
  }, [selectArea]);

  const openGraph = () => {
    if (selectArea) {
      setGeoArea(selectArea);
    }
    if (geoArea) {
      const areaData = visitor.filter((item) => item.area === geoArea);
      const visitorData = areaData.map((item) => parseInt(item.visitor));
      const dateLabels = areaData.map((item) => item.date);
      setMinValue(Math.min(...visitorData));
      const newChartData: ChartData<'line'> = {
        labels: dateLabels,
        datasets: [
          {
            label: '월',
            data: visitorData,
            borderColor: '#FF928A',
            tension: 0.4,
          },
        ],
      };
      setChartData(newChartData);
    }
  };

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false, // 비율 유지하지 않음
    responsive: true, // 반응형 활성화
    animation: {
      duration: 2000, // 애니메이션 지속 시간 (밀리초)
      easing: 'easeInOutSine', // 애니메이션 이징 함수
    },
    scales: {
      y: {
        ticks: {
          display: true, // 눈금 표시 여부
        },
        beginAtZero: true,
        min: minValue,
      },
    },
    layout: {
      padding: {
        top: 10, // 그래프 위쪽 패딩
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.parsed.x + 1;
            const value = context.parsed.y;
            return label + '월 : "' + numToKorean(value) + '" 명';
          },
        },
      },
    },
  };

  return (
    <>
      {openModal && <SelectArea modal={openModal} setModal={setOpenModal} setArea={setSelectArea} nowArea={location} />}
      <div onClick={isOpen} className=" mt-4 text-xl py-4 font-semibold text-white cursor-pointer buttonHoverColor">
        <div className="flex justify-center buttonHoverSize">
          <SlLocationPin className="inline-block mr-2 font-thin translate-y-1" />
          <h3 className="hover:scale-110">{m(location)}</h3>
        </div>
      </div>
      <div className="max-w-[400px] h-[300px] flex justify-center mt-4 mx-auto ">
        <Line data={chartData} options={options} />
      </div>
      <div className="font-normal mt-6">
        2023 {m('GRAPH_YEAR')}{' '}
        <strong onClick={openGraph} className="text-main-color2 text-2xl cursor-pointer">
          {m(location)}
        </strong>{' '}
        {m('VISITOR_STATUS')}
      </div>
      <div className="text-base text-gray-400 mt-3 font-normal">({m('REPAINT_GRAPH')})</div>
    </>
  );
}
export default GraphComponent;
