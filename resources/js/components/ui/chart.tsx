import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartProps {
  data: any
  options?: any
}

export function LineChart({ data, options }: ChartProps) {
  return <Line data={data} options={options} />
}

export function BarChart({ data, options }: ChartProps) {
  return <Bar data={data} options={options} />
}

export function PieChart({ data, options }: ChartProps) {
  return <Pie data={data} options={options} />
}

export function AreaChart({ data, options }: ChartProps) {
  // For area chart, we'll use Line chart with fill option
  const areaData = {
    ...data,
    datasets: data.datasets.map((dataset: any) => ({
      ...dataset,
      fill: true,
    })),
  }

  const areaOptions = {
    ...options,
    plugins: {
      ...options?.plugins,
      filler: {
        propagate: false,
      },
    },
  }

  return <Line data={areaData} options={areaOptions} />
}
