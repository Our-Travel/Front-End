// import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
// import { Chart } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker/locale/de';
// ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);

// const labels = ['05/01', '05/02', '05/03', '05/04', '05/05', '05/06', '05/07'];

// const data = {
//   labels,
//   datasets: [
//     {
//       type: 'line' as const,
//       label: 'Dataset 1',
//       borderColor: 'rgb(255, 99, 132)',
//       borderWidth: 2,
//       fill: false,
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     },
//     {
//       type: 'bar' as const,
//       label: 'Dataset 2',
//       backgroundColor: 'rgb(75, 192, 192)',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'white',
//       borderWidth: 2,
//     },
//     {
//       type: 'bar' as const,
//       label: 'Dataset 3',
//       backgroundColor: 'rgb(53, 162, 235)',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     },
//   ],
// };
const GraphComponent = () => {
  return (
    <div className="w-[400px] h-[300px] m-auto pt-10">
      그래프
      {/* <Chart type="bar" data={data} /> */}
    </div>
  );
};

export default GraphComponent;
