import { useMemo, useRef, useState } from "react"
import ComparisonTable from "./components/ComparisionTable"
import { useTimeseriesData } from "./hooks/useDashboardData"
import PerformanceChart from "./components/PerformanceChart"
import "./Dashboard.css"
import { COLORS } from "@/components/chart/chartColors"

export default function DashboardPage() {

  const [symbols, setSymbols] = useState<string[]>([])
  const colorMapRef = useRef<Record<string, string>>({})

  const { data, loading } = useTimeseriesData(symbols)
	//console.log("Timeseries Data:", data)

  const datasets = useMemo(() => {
    const colors = COLORS
    const usedColors = new Set(Object.values(colorMapRef.current))
    return symbols.map((symbol, index) => {
      const existing = colorMapRef.current[symbol]
      if (existing) {
        return { symbol, color: existing, data: data[symbol] ?? [] }
      }

      const nextColor =
        colors.find((color) => !usedColors.has(color)) ??
        colors[index % colors.length]

      usedColors.add(nextColor)
      colorMapRef.current[symbol] = nextColor

      return { symbol, color: nextColor, data: data[symbol] ?? [] }
    })
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