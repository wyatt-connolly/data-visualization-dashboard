'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data:number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

interface PieChartProps {
  data: ChartData;
}

export function PieChart({ data }: PieChartProps) {
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
      },
    },
  }

  const chartData: ChartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(59, 130, 246)',
        'rgb(249, 115, 22)',
        'rgb(16, 185, 129)',
        'rgb(139, 92, 246)',
        'rgb(234, 179, 8)',
      ],
      borderWidth: 2,
    })),
  }

  return <Pie data={chartData} options={options} />
}

