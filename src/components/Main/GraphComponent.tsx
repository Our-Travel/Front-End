import { useEffect, useState } from 'react';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { SlLocationPin } from 'react-icons/sl';
import addressGetter from '../../hooks/addressGetter';
import { visitor } from 'util/visitor';
import { convertAddressToKey } from 'util/convertAddress';
import Papa from 'papaparse';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraphComponent() {
  const address = addressGetter();
  const area = convertAddressToKey(address);
  console.log(area);

  const [minValue, setMinValue] = useState(Number);
  const { numToKorean } = require('num-to-korean');
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
    retry();
  }, []);

  const retry = async () => {
    if (area) {
      const areaData = visitor.filter((item) => item.area === area);
      console.log(areaData);

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
      <div onClick={retry} className="flex justify-center mt-7 text-xl bg-main-color2 py-4 font-semibold text-white cursor-pointer hover:underline hover:text-gray-200">
        <SlLocationPin className="inline-block mr-2 font-thin translate-y-1" />
        <h3 className="hover:scale-110">{area}</h3>
      </div>
      <div className="w-[400px] h-[300px] flex justify-center mt-7 mx-auto ">
        <Line data={chartData} options={options} />
      </div>
    </>
  );
}
export default GraphComponent;
