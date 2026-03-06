import type { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "symbolCode",
    header: "Symbol",
  },
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "marketCapitalization",
    header: "Market Cap",
  },
  {
    accessorKey: "peTtm",
    header: "PE TTM",
  },
  {
    accessorKey: "revenueGrowthTtmYoy",
    header: "Rev Growth TTM",
  },
  {
    accessorKey: "currentDividendYieldTtm",
    header: "Div Yield TTM",
  },
]