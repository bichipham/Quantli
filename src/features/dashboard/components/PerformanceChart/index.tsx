import { createChart, AreaSeries } from "lightweight-charts";
import { useEffect, useRef } from "react";
import type { LineData } from "../../type/chart";

type Props = {
  datasets: LineData[];
};

export default function PerformanceChart({ datasets }: Props) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      height: 320,
    });
    datasets?.forEach((item: LineData) => {
      const series = chart.addSeries(AreaSeries, {
        lineColor: item.color,
        topColor: item.color + "66",
        bottomColor: item.color + "10",
        lineWidth: 2,
      });

      series.setData(item.data);
    });

    chart.timeScale().fitContent();
    return () => chart.remove();
  }, [datasets]);

  return <div ref={chartContainerRef} />;
}
