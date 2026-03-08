import { useState } from "react"
import ComparisonTable from "./components/ComparisionTable"
import {useTimeseriesData} from "./hooks/useDashboardData"
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
       // symbols={symbols}
     //   datasets={data}
      //  loading={loading}
      />
    </>
  )
}