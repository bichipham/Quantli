import { createChart, LineSeries, ColorType } from "lightweight-charts"
import { useEffect, useRef } from "react"
import type { LineData } from "../../type/chart"
import "./PerformanceChart.css"

type Props = {
  data: LineData[]
  loading?: boolean
}

export default function PerformanceChart({ data, loading = false }: Props) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const container = chartContainerRef.current

    const chart = createChart(chartContainerRef.current, {
      height: container.clientHeight,
      width: container.clientWidth,
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#0f172a",
      },
      grid: {
        vertLines: { color: "rgba(148, 163, 184, 0.3)" },
        horzLines: { color: "rgba(148, 163, 184, 0.3)" },
      },
      rightPriceScale: {
        borderColor: "rgba(148, 163, 184, 0.35)",
      },
      timeScale: {
        borderColor: "rgba(148, 163, 184, 0.35)",
      },
    })

    data.forEach((item) => {
      const series = chart.addSeries(LineSeries, {
        color: item.color,
        lineWidth: 2,
      })

      series.setData(item.data)
    })

    chart.timeScale().fitContent()

    const handleResize = () => {
      if (!container) return
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [data])

  return (
    <section className="performance-chart">
      <h2 className="section-title">Peer Performance Chart</h2>
      <div className="performance-chart__legend">
        {data?.map((item) => (
          <span key={item.symbol} className="legend-item">
            <span
              className="legend-swatch"
              style={{ backgroundColor: item.color }}
            />
            {item.symbol}
          </span>
        ))}
      </div>
      <div className="performance-chart__canvas" ref={chartContainerRef}>
        {loading ? (
          <div className="performance-chart__loading">Loading...</div>
        ) : null}
      </div>
      <p className="performance-chart__note">
        Select up to 4 companies in the table above to customize the chart view
      </p>
    </section>
  )
}
