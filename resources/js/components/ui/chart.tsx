import * as React from "react"

interface ChartProps {
  data: any
  options?: any
}

function BarChart({ data, options }: ChartProps) {
  return (
    <div className="flex items-center justify-center h-full w-full text-slate-500">
      <p>Bar Chart - Chart library integration needed</p>
    </div>
  )
}

function LineChart({ data, options }: ChartProps) {
  return (
    <div className="flex items-center justify-center h-full w-full text-slate-500">
      <p>Line Chart - Chart library integration needed</p>
    </div>
  )
}

function PieChart({ data, options }: ChartProps) {
  return (
    <div className="flex items-center justify-center h-full w-full text-slate-500">
      <p>Pie Chart - Chart library integration needed</p>
    </div>
  )
}

function AreaChart({ data, options }: ChartProps) {
  return (
    <div className="flex items-center justify-center h-full w-full text-slate-500">
      <p>Area Chart - Chart library integration needed</p>
    </div>
  )
}

export { BarChart, LineChart, PieChart, AreaChart }

