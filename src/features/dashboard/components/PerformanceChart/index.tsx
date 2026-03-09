import { useEffect, useMemo, useRef } from "react";
import { ColorType } from "lightweight-charts";
import type { LineData } from "../../type/chart";
import { useLightweightChart } from "@/components/chart/useLightweightChart";
import { useChartSeries } from "@/components/chart/useChartSeries";
import "./PerformanceChart.css";

type Props = {
  data: LineData[];
  loading?: boolean;
};

export default function PerformanceChart({ data, loading = false }: Props) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartOptions = useMemo(
    () => ({
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#0f172a",
      },
      grid: {
        vertLines: { color: "rgba(148, 163, 184, 0.3)" },
        horzLines: { color: "rgba(148, 163, 184, 0.3)" },
      },
			leftPriceScale: {
        visible: false,
        // minimumWidth: 40,
      },
      rightPriceScale: {
				visible: true,
        borderColor: "rgba(148, 163, 184, 0.35)",
        minimumWidth: 80,
        scaleMargins: {
          top: 0.1,
          bottom: 0.25,
        },
      },
      
      timeScale: {
        borderColor: "rgba(148, 163, 184, 0.35)",
        rightOffset: 6,
      },
      priceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.25,
        },
      },
      waterMark: {
        visible: false,
      },
    }),
    [],
  );
  const chartRef = useLightweightChart(chartContainerRef.current, chartOptions);

  const toBusinessDay = (date: Date) => ({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  });

  useChartSeries(chartRef, data);

  const timeRange = useMemo(() => {
    const allDates = data
      .flatMap((item) => item.data.map((p) => p.time))
      .filter(Boolean);
    if (!allDates.length) return null;

    const maxDate = allDates.reduce((max, current) =>
      current > max ? current : max,
    );
    const latestDate = new Date(maxDate);
    if (Number.isNaN(latestDate.getTime())) return null;

    const fromDate = new Date(latestDate);
    fromDate.setMonth(fromDate.getMonth() - 6);

    return {
      from: toBusinessDay(fromDate),
      to: toBusinessDay(latestDate),
    };
  }, [data]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const timeScale = chart.timeScale?.();
    if (!timeScale) return;

    if (!timeRange) {
      timeScale.fitContent();
      return;
    }

    try {
      timeScale.setVisibleRange(timeRange);
    } catch {
      timeScale.fitContent();
    }
  }, [chartRef, timeRange]);

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
      <div className="performance-chart__canvas">
        <div className="performance-chart__inner" ref={chartContainerRef} />
        <div className="performance-chart__y-label">Performance</div>
        {loading ? (
          <div className="performance-chart__loading"></div>
        ) : null}
      </div>
      <p className="performance-chart__note">
        Select up to 4 companies in the table above to customize the chart view
      </p>
    </section>
  );
}
