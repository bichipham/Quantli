import { useEffect, useRef } from "react"
import type { IChartApi, ISeriesApi } from "lightweight-charts"
import { LineSeries } from "lightweight-charts"
import type { LineData } from "@/features/dashboard/type/chart"
import { COLORS } from "./chartColors"

type SeriesFactory = (
  chart: IChartApi,
  options: {
    color: string
  }
) => ISeriesApi<"Line">

const defaultSeriesFactory: SeriesFactory = (chart, options) =>
  chart.addSeries(LineSeries, {
    color: options.color,
    lineWidth: 2,
    priceFormat: {
      type: "percent",
      precision: 2,
      minMove: 0.01,
    },
  })

export function useChartSeries(
  chartRef: React.RefObject<IChartApi | null>,
  datasets: LineData[],
  createSeries: SeriesFactory = defaultSeriesFactory
) {
  const seriesMap = useRef<Map<string, ISeriesApi<"Line">>>(new Map())

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    datasets?.forEach((dataset, index) => {
      const symbol = dataset.symbol
      const color = dataset.color || COLORS[index % COLORS.length]

      if (!seriesMap.current.has(symbol)) {
        const series = createSeries(chart, { color })
        series.setData(dataset.data ?? [])
        seriesMap.current.set(symbol, series)
      } else {
        const series = seriesMap.current.get(symbol)
        series?.setData(dataset.data ?? [])
      }
    })

    seriesMap.current.forEach((series, symbol) => {
      if (!datasets.some((item) => item.symbol === symbol)) {
        chart.removeSeries(series)
        seriesMap.current.delete(symbol)
      }
    })
  }, [chartRef, datasets, createSeries])
}