import { useState } from "react"
import ComparisonTable from "./components/ComparisionTable"
import { useTimeseriesData } from "./hooks/useTimeseriesData"
import PerformanceChart from "./components/PerformanceChart"

export default function DashboardPage() {

  const [symbols, setSymbols] = useState<string[]>([])

  const { data, loading } = useTimeseriesData(symbols)

  return (
    <>
      <ComparisonTable
        maxSelected={4}
        onSelectionChange={setSymbols}
      />

      <PerformanceChart
        symbols={symbols}
        data={data}
        loading={loading}
      />
    </>
  )
}