import { useEffect, useRef } from "react"
import type { IChartApi, ISeriesApi } from "lightweight-charts"
import {
  LineSeries,
  AreaSeries,
  BarSeries,
  CandlestickSeries,
  HistogramSeries,
  BaselineSeries,
} from "lightweight-charts"
import type { ChartSeriesData, ChartSeriesType } from "@/features/dashboard/type/chart"
import { COLORS } from "./chartColors"

type SeriesFactory = (
  chart: IChartApi,
  dataset: ChartSeriesData,
  color: string
  ) =>
    | ISeriesApi<"Line">
    | ISeriesApi<"Area">
    | ISeriesApi<"Bar">
    | ISeriesApi<"Candlestick">
    | ISeriesApi<"Histogram">
    | ISeriesApi<"Baseline">

const defaultSeriesFactory: SeriesFactory = (chart, dataset, color) => {
  const type = dataset.type ?? "line"

  switch (type) {
    case "area":
      return chart.addSeries(AreaSeries, {
        lineColor: color,
        topColor: `${color}33`,
        bottomColor: `${color}08`,
        lineWidth: 2,
        priceFormat: {
          type: "percent",
          precision: 2,
          minMove: 0.01,
        },
      })
    case "bar":
      return chart.addSeries(BarSeries, {
        upColor: color,
        downColor: "#ef4444",
        priceFormat: {
          type: "percent",
          precision: 2,
          minMove: 0.01,
        },
      })
    case "candlestick":
      return chart.addSeries(CandlestickSeries, {
        upColor: color,
        downColor: "#ef4444",
        borderUpColor: color,
        borderDownColor: "#ef4444",
        wickUpColor: color,
        wickDownColor: "#ef4444",
      })
    case "histogram":
      return chart.addSeries(HistogramSeries, {
        color,
        priceFormat: {
          type: "volume",
        },
      })
    case "baseline":
      return chart.addSeries(BaselineSeries, {
        baseValue: { type: "price", price: 0 },
        topLineColor: color,
        bottomLineColor: "#ef4444",
        topFillColor1: `${color}33`,
        topFillColor2: `${color}08`,
        bottomFillColor1: "rgba(239, 68, 68, 0.2)",
        bottomFillColor2: "rgba(239, 68, 68, 0.05)",
        priceFormat: {
          type: "percent",
          precision: 2,
          minMove: 0.01,
        },
      })
    case "custom":
      return chart.addSeries(LineSeries, {
        color,
        lineWidth: 2,
      })
    case "line":
    default:
      return chart.addSeries(LineSeries, {
        color,
        lineWidth: 2,
        priceFormat: {
          type: "percent",
          precision: 2,
          minMove: 0.01,
        },
      })
  }
}

export function useChartSeries(
  chartRef: React.RefObject<IChartApi | null>,
  datasets: ChartSeriesData[],
  createSeries: SeriesFactory = defaultSeriesFactory
) {
  const seriesMap = useRef<
    Map<
      string,
      | ISeriesApi<"Line">
      | ISeriesApi<"Area">
      | ISeriesApi<"Bar">
      | ISeriesApi<"Candlestick">
      | ISeriesApi<"Histogram">
      | ISeriesApi<"Baseline">
    >
  >(new Map())

  const getFallbackData = (type: ChartSeriesType) => {
    if (type === "bar" || type === "candlestick") {
      return [
        { time: 1700000000, open: 0, high: 0, low: 0, close: 0 },
        { time: 1700000001, open: 0, high: 0, low: 0, close: 0 },
      ]
    }

    return [
      { time: 1700000000, value: 0 },
      { time: 1700000001, value: 0 },
    ]
  }

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    datasets?.forEach((dataset, index) => {
      const type = dataset.type ?? "line"
      const key = `${dataset.symbol}:${type}`
      const color = dataset.color || COLORS[index % COLORS.length]

      if (!seriesMap.current.has(key)) {
        const series = createSeries(chart, dataset, color)
        if (!dataset.data || dataset.data.length === 0) {
          series.setData(getFallbackData(type) as never[])
        } else {
          series.setData(dataset.data as never[])
        }
        seriesMap.current.set(key, series)
      } else {
        const series = seriesMap.current.get(key)
        if (!dataset.data || dataset.data.length === 0) {
          series?.setData(getFallbackData(type) as never[])
        } else {
          series?.setData(dataset.data as never[])
        }
      }
    })

    seriesMap.current.forEach((series, key) => {
      if (!datasets.some((item) => `${item.symbol}:${item.type ?? "line"}` === key)) {
        chart.removeSeries(series)
        seriesMap.current.delete(key)
      }
    })
  }, [chartRef, datasets, createSeries])
}