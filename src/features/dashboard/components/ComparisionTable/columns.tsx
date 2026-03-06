import { createContext, memo, useContext } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Avatar } from "@/components/avatar"
import { Checkbox } from "@/components/checkbox"
import { convertCurrency } from "@/utils"
import type { Stock } from "../../type/stock"

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



type SelectionContextValue = {
  selectedSymbols: Set<string>
  selectedCount: number
  maxSelected: number
  onToggle: (symbol: string) => void
}

export const SelectionContext = createContext<SelectionContextValue | null>(null)

const useSelectionContext = () => {
  const context = useContext(SelectionContext)
  if (!context) {
    return {
      selectedSymbols: new Set<string>(),
      selectedCount: 0,
      maxSelected: 0,
      onToggle: () => {},
    }
  }
  return context
}

const CompanyCell = memo(({ stock }: { stock: Stock }) => (
  <div className="company-cell">
    <Avatar src={stock.logo} alt={stock.companyName} size="small" />
    <div>
      <div className="company-name" title={stock.companyName}>
        {stock.companyName}
      </div>
      <div className="company-meta">{stock.symbolCode}</div>
    </div>
  </div>
))

const SelectHeader = () => {
  const { selectedCount, maxSelected } = useSelectionContext()
  return `(${selectedCount}/${maxSelected})`
}

const SelectCell = ({ stock }: { stock: Stock }) => {
  const { selectedSymbols, selectedCount, maxSelected, onToggle } =
    useSelectionContext()
  const symbol = stock.symbolCode
  const checked = selectedSymbols.has(symbol)
  const disabled = !checked && selectedCount >= maxSelected

  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      onChange={() => onToggle(symbol)}
    />
  )
}

export const columns: ColumnDef<Stock>[] = [
  {
    id: "select",
    header: () => <SelectHeader />,
    cell: ({ row }) => <SelectCell stock={row.original} />,
    meta: { className: "column-select" },
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
      return `$${convertCurrency(value)}`
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