import { useMemo, useState } from "react"
import ComparisonTable from "./components/ComparisionTable"
import { useTimeseriesData } from "./hooks/useDashboardData"
import PerformanceChart from "./components/PerformanceChart"
import "./Dashboard.css"

export default function DashboardPage() {

  const [symbols, setSymbols] = useState<string[]>([])

  const { data, loading } = useTimeseriesData(symbols)
	//console.log("Timeseries Data:", data)

  const datasets = useMemo(() => {
    const colors = ["#2563eb", "#16a34a", "#f97316", "#9333ea"]
    return symbols.map((symbol, index) => ({
      symbol,
      color: colors[index % colors.length],
      data: data[symbol] ?? [],
    }))
  }, [data, symbols])

  return (
    <section className="dashboard-page">
      <ComparisonTable
        maxSelected={4}
        onSelectionChange={setSymbols}
      />

      <PerformanceChart
        data={datasets}
        loading={loading}
      />
    </section>
  )
}