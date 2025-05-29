// RevenueTrendChart.jsx
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip);
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue (₦)',
        data: [120000, 125000, 115000, 130000, 155000, 100000],
        backgroundColor: 'rgba(174, 219, 255, 0.4)',
        borderColor: '#111',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#000',
        pointRadius: 5,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `₦${value.toLocaleString()}`,
        },
        beginAtZero: true,
      },
    },
  };
  
  export default function RevenueTrendChart() {
    return <Line data={data} options={options} />;
  }
  