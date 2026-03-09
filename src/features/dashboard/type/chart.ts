export type ChartSeriesType =
  | "line"
  | "area"
  | "bar"
  | "candlestick"
  | "histogram"
  | "baseline"
  | "custom"

export type ChartTime = string | number

export type LineSeriesPoint = {
  time: ChartTime
  value: number
}

export type HistogramSeriesPoint = {
  time: ChartTime
  value: number
}

export type OhlcSeriesPoint = {
  time: ChartTime
  open: number
  high: number
  low: number
  close: number
}

export type ChartSeriesData =
  | {
      symbol: string
      color: string
      type?: "line" | "area" | "baseline"
      data: LineSeriesPoint[]
    }
  | {
      symbol: string
      color: string
      type: "bar" | "candlestick"
      data: OhlcSeriesPoint[]
    }
  | {
      symbol: string
      color: string
      type: "histogram"
      data: HistogramSeriesPoint[]
    }
  | {
      symbol: string
      color: string
      type: "custom"
      data: unknown[]
    }