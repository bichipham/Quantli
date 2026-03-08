import { useEffect, useRef, useState } from "react"
import { fetchTimeseriesBySymbols } from "../api/mock_api"

type ChartPoint = {
  time: string
  value: number
}

type ChartDataMap = Record<string, ChartPoint[]>

export default function useTimeseriesData(symbols: string[]) {
  const [data, setData] = useState<ChartDataMap>({})
  const [loading, setLoading] = useState(false)

  const cacheRef = useRef<ChartDataMap>({})

  useEffect(() => {
    if (!symbols.length) {
      setData({})
      return
    }

    const missing = symbols.filter(s => !cacheRef.current[s])

    if (!missing.length) {
      const map: ChartDataMap = {}

      symbols.forEach(s => {
        map[s] = cacheRef.current[s]
      })

      setData(map)
      return
    }

    setLoading(true)

    fetchTimeseriesBySymbols(missing).then(res => {
      res.forEach(item => {
        cacheRef.current[item.symbolCode] = item.data.map(p => ({
          time: p.t.slice(0, 10),
          value: p.v,
        }))
      })

      const map: ChartDataMap = {}

      symbols.forEach(s => {
        map[s] = cacheRef.current[s]
      })

      setData(map)
      setLoading(false)
    })
  }, [symbols])

  return { data, loading }
}