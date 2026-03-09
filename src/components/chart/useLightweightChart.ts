import {
  createChart,
  type IChartApi,
  type ChartOptions,
  type DeepPartial,
} from "lightweight-charts"
import { useEffect, useRef } from "react"

export function useLightweightChart(
  container: HTMLDivElement | null,
  options?: DeepPartial<ChartOptions>
) {
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!container) return

    const chart = createChart(container, {
      height: container.clientHeight || 400,
      width: container.clientWidth || 600,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#111827",
      },
      grid: {
        vertLines: { visible: true },
        horzLines: { visible: true },
      },
      crosshair: {
        mode: 0,
      },
    })

    chartRef.current = chart

    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
      chartRef.current = null
    }
  }, [container])

  useEffect(() => {
    if (!chartRef.current || !options) return
    chartRef.current.applyOptions(options)
  }, [options])

  return chartRef
}