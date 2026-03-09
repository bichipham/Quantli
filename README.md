# Quantli Dashboard

React + TypeScript dashboard using TanStack Table and Lightweight Charts.

## Stack

- React + TypeScript (Vite)
- TanStack Table (data grid)
- Lightweight Charts (performance chart)

## Highlights

- **TanStack Table** powers the peer comparison table with custom cell renderers and selection.
- **Lightweight Charts** renders multi-series performance lines.
- **Chart data caching** is implemented to avoid re-fetching timeseries data when switching selections.
- **Reusable components**: table, chart hooks, avatar, and checkbox components are built to be reused.

## Key Files

- Table columns: [src/features/dashboard/components/ComparisionTable/columns.tsx](src/features/dashboard/components/ComparisionTable/columns.tsx)
- Table container: [src/features/dashboard/components/ComparisionTable/index.tsx](src/features/dashboard/components/ComparisionTable/index.tsx)
- Chart component: [src/features/dashboard/components/PerformanceChart/index.tsx](src/features/dashboard/components/PerformanceChart/index.tsx)
- Chart hooks: [src/components/chart/useLightweightChart.ts](src/components/chart/useLightweightChart.ts), [src/components/chart/useChartSeries.ts](src/components/chart/useChartSeries.ts)
- Data caching hook: [src/features/dashboard/hooks/useDashboardData.ts](src/features/dashboard/hooks/useDashboardData.ts)

