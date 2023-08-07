import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory';

const 강원도 = [
  { quarter: 1, visit: 13000 },
  { quarter: 2, visit: 16500 },
  { quarter: 3, visit: 14250 },
  { quarter: 4, visit: 19000 },
];

const 경상도 = [
  { quarter: 1, visit: 15000 },
  { quarter: 2, visit: 12500 },
  { quarter: 3, visit: 19500 },
  { quarter: 4, visit: 13000 },
];

const 전라도 = [
  { quarter: 1, visit: 11500 },
  { quarter: 2, visit: 13250 },
  { quarter: 3, visit: 20000 },
  { quarter: 4, visit: 15500 },
];

const 제주도 = [
  { quarter: 1, visit: 18000 },
  { quarter: 2, visit: 13250 },
  { quarter: 3, visit: 15000 },
  { quarter: 4, visit: 12000 },
];
function GraphComponent() {
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
  return (
    <>
      <div className="w-[400px] h-[150px] pl-10 mt-7 mx-auto ">
        <Line data={chartData} />
      </div>
      <div className="w-[400px] h-[250px]  mx-auto">
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
      </div>
    </>
  );
}
export default GraphComponent;
