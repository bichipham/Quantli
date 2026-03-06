import type { ColumnDef } from "@tanstack/react-table"
import { Avatar } from "@/components/avatar"
import { Checkbox } from "@/components/checkbox"
import type { Stock } from "../../type/stock"
import React from "react"

const formatPercent = (value: number) => `${value.toFixed(2)}%`

const renderSignedValue = (value: unknown) => {
  if (value == null || value === "") return "-"

  if (typeof value !== "number" || Number.isNaN(value)) {
    return String(value)
  }

  const className =
    value > 0 ? "value-positive" : value < 0 ? "value-negative" : "value-neutral"

  return (
    <span className={className}>
      {value > 0 ? "+" : ""}
      {formatPercent(value)}
    </span>
  )
}

type ColumnsParams = {
  selectedSymbols: Set<string>
  selectedCount: number
  maxSelected: number
  onToggle: (symbol: string) => void
}

const CompanyCell = ({ stock }: { stock: Stock }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <Avatar src={stock.logo} alt={stock.companyName} size="small" />

    <div>
      <div>{stock.companyName}</div>
      <div style={{ fontSize: 12, color: "#64748b" }}>
        {stock.symbolCode}
      </div>
    </div>
  </div>
)

export const createColumns = ({
  selectedSymbols,
  selectedCount,
  maxSelected,
  onToggle,
}: ColumnsParams): ColumnDef<Stock>[] => [
  {
    id: "select",
    header: `Selected (${selectedCount}/${maxSelected})`,
    cell: ({ row }) => {
      const symbol = row.original.symbolCode
      const checked = selectedSymbols.has(symbol)
      const disabled = !checked && selectedCount >= maxSelected

      return (
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={() => onToggle(symbol)}
          inputProps={{
            "aria-label": `Select ${symbol}`,
          }}
        />
      )
    },
  },

  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => <CompanyCell stock={row.original} />,
  },

  {
    accessorKey: "marketCapitalization",
    header: "Market Cap",
    cell: ({ getValue }) => {
      const value = getValue<number>()
      return value ? `$${value.toLocaleString()}` : "-"
    },
  },

  {
    accessorKey: "peTtm",
    header: "PE TTM",
    cell: ({ getValue }) => {
      const value = getValue<number>()
      return value ? value.toFixed(2) : "-"
    },
  },

  {
    accessorKey: "revenueGrowthTtmYoy",
    header: "Rev Growth TTM",
    cell: ({ getValue }) => renderSignedValue(getValue()),
  },

  {
    accessorKey: "currentDividendYieldTtm",
    header: "Div Yield TTM",
    cell: ({ getValue }) => renderSignedValue(getValue()),
  },
]

export default createColumns