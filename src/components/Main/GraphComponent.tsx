import { useEffect, useState } from 'react';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { GrFormLocation } from 'react-icons/gr';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraphComponent() {
  const address = addressGetter();

  const chartData: ChartData<'line'> = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
    datasets: [
      {
        label: '월',
        data: [3, 2, 3, 1, 2, 4, 2],
        borderColor: '#FF928A',
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false, // 비율 유지하지 않음
    responsive: true, // 반응형 활성화
    animation: {
      duration: 1000, // 애니메이션 지속 시간 (밀리초)
      easing: 'linear', // 애니메이션 이징 함수
    },
    scales: {
      y: {
        ticks: {
          display: true, // 눈금 표시 여부
          stepSize: 1, // 눈금 간격 설정
        },
        beginAtZero: true,
        max: 20,
        min: 0,
      },
    },
    layout: {
      padding: {
        top: 0, // 그래프 위쪽 패딩
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.datasetIndex + 1;
            const value = context.parsed.y;
            return label + ': ' + value + '여기바꿔야해애애ㅐ'; // 툴팁 라벨 포맷 변경
          },
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-center mt-7">
        <GrFormLocation className="w-10 h-10 inline-block font-thin -translate-y-1" />
        <h3>{address}</h3>
      </div>
      <div className="w-[400px] h-[300px] flex justify-center mt-4 mx-auto ">
        <Line data={chartData} options={options} />
      </div>
      {/* <div className="w-[400px] h-[250px]  mx-auto">
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={['강원도', '경상도', '전라도', '제주도']} />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}k`} />
          <VictoryStack colorScale={'warm'}>
            <VictoryBar data={강원도} x="quarter" y="visit" />
            <VictoryBar data={경상도} x="quarter" y="visit" />
            <VictoryBar data={전라도} x="quarter" y="visit" />
            <VictoryBar data={제주도} x="quarter" y="visit" />
          </VictoryStack>
        </VictoryChart>
      </div> */}
    </>
  );
}
export default GraphComponent;

import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory';
import { cls } from '../../util/util';
import GeolocationWithAddress from '../../hooks/addressGetter';
import addressGetter from '../../hooks/addressGetter';

// const 강원도 = [
//   { quarter: 1, visit: 13000 },
//   { quarter: 2, visit: 16500 },
//   { quarter: 3, visit: 14250 },
//   { quarter: 4, visit: 19000 },
// ];

// const 경상도 = [
//   { quarter: 1, visit: 15000 },
//   { quarter: 2, visit: 12500 },
//   { quarter: 3, visit: 19500 },
//   { quarter: 4, visit: 13000 },
// ];

// const 전라도 = [
//   { quarter: 1, visit: 11500 },
//   { quarter: 2, visit: 13250 },
//   { quarter: 3, visit: 20000 },
//   { quarter: 4, visit: 15500 },
// ];

// const 제주도 = [
//   { quarter: 1, visit: 18000 },
//   { quarter: 2, visit: 13250 },
//   { quarter: 3, visit: 15000 },
//   { quarter: 4, visit: 12000 },
// ];
